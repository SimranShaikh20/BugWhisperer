import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { parseRepoUrl, fetchIssues } from "./github";
import type { AIAnalysis, AnalysisResult, SprintPlan, SprintTask } from "@/types";

const InputSchema = z.object({ repo_url: z.string().min(1) });

const FALLBACK: AIAnalysis = {
  root_cause: "Unable to parse AI response.",
  suggested_fix: "Review the issue manually for further investigation.",
  complexity: "Medium",
  priority: "Medium",
};

function extractJson(text: string): AIAnalysis {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return FALLBACK;
    const parsed = JSON.parse(match[0]);
    return {
      root_cause: String(parsed.root_cause ?? FALLBACK.root_cause),
      suggested_fix: String(parsed.suggested_fix ?? FALLBACK.suggested_fix),
      complexity: ["Low", "Medium", "High"].includes(parsed.complexity)
        ? parsed.complexity
        : "Medium",
      priority: ["Low", "Medium", "High", "Critical"].includes(parsed.priority)
        ? parsed.priority
        : "Medium",
    };
  } catch {
    return FALLBACK;
  }
}

async function analyzeWithGroq(
  apiKey: string,
  issue: { title: string; body: string; labels: string[] },
): Promise<AIAnalysis> {
  const userPrompt = `Analyze this GitHub issue and respond ONLY in this exact JSON format:
{
  "root_cause": "one sentence explaining likely cause",
  "suggested_fix": "concrete fix in 2-3 sentences",
  "complexity": "Low | Medium | High",
  "priority": "Low | Medium | High | Critical"
}

Issue Title: ${issue.title}
Issue Labels: ${issue.labels.join(", ") || "none"}
Issue Description: ${(issue.body || "").slice(0, 2000)}`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content:
            "You are a senior software engineer. Analyze GitHub issues and respond ONLY in valid JSON format, no other text.",
        },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Groq API error: ${res.status} ${errText.slice(0, 200)}`);
  }
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content ?? "";
  return extractJson(content);
}

export const analyzeRepo = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<AnalysisResult> => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Missing GROQ_API_KEY on the server.");

    const { owner, repo } = parseRepoUrl(data.repo_url);
    const issues = await fetchIssues(owner, repo, 5);

    const analyzed = [];
    for (let i = 0; i < issues.length; i++) {
      const issue = issues[i];
      const ai_analysis = await analyzeWithGroq(apiKey, issue);
      analyzed.push({ ...issue, ai_analysis });
      if (i < issues.length - 1) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    return {
      repo: `${owner}/${repo}`,
      total_issues: analyzed.length,
      issues: analyzed,
    };
  });

const SprintInputSchema = z.object({
  issues: z
    .array(
      z.object({
        number: z.number(),
        title: z.string(),
        ai_analysis: z.object({
          root_cause: z.string(),
          suggested_fix: z.string(),
          complexity: z.string(),
          priority: z.string(),
        }),
      }),
    )
    .min(1),
});

const EMPTY_PLAN: SprintPlan = {
  sprint_goal: "Unable to generate sprint plan.",
  week_1: [],
  week_2: [],
  backlog: [],
  total_estimated_hours: 0,
  team_size_recommended: 1,
};

function coerceTasks(value: unknown): SprintTask[] {
  if (!Array.isArray(value)) return [];
  const out: SprintTask[] = [];
  for (const t of value) {
    if (!t || typeof t !== "object") continue;
    const o = t as Record<string, unknown>;
    const num = Number(o.issue_number);
    if (!Number.isFinite(num)) continue;
    const task: SprintTask = {
      issue_number: num,
      title: String(o.title ?? ""),
      estimated_hours: Number(o.estimated_hours) || 0,
    };
    if (o.reason) task.reason = String(o.reason);
    out.push(task);
  }
  return out;
}

function extractSprintPlan(text: string): SprintPlan {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return EMPTY_PLAN;
    const parsed = JSON.parse(match[0]) as Record<string, unknown>;
    return {
      sprint_goal: String(parsed.sprint_goal ?? EMPTY_PLAN.sprint_goal),
      week_1: coerceTasks(parsed.week_1),
      week_2: coerceTasks(parsed.week_2),
      backlog: coerceTasks(parsed.backlog),
      total_estimated_hours: Number(parsed.total_estimated_hours) || 0,
      team_size_recommended: Number(parsed.team_size_recommended) || 1,
    };
  } catch {
    return EMPTY_PLAN;
  }
}

export const generateSprintPlan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SprintInputSchema.parse(input))
  .handler(async ({ data }): Promise<SprintPlan> => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Missing GROQ_API_KEY on the server.");

    const issuesJson = JSON.stringify(
      data.issues.map((i) => ({
        issue_number: i.number,
        title: i.title,
        complexity: i.ai_analysis.complexity,
        priority: i.ai_analysis.priority,
      })),
    );

    const userPrompt = `You are a senior engineering manager.
Given these GitHub issues with their complexity and priority ratings, create a 2-week sprint plan.

Issues: ${issuesJson}

Respond ONLY in this exact JSON format, no other text:
{
  "sprint_goal": "one sentence sprint goal",
  "week_1": [
    { "issue_number": 1, "title": "...", "estimated_hours": 4, "reason": "why this week" }
  ],
  "week_2": [
    { "issue_number": 2, "title": "...", "estimated_hours": 6, "reason": "why this week" }
  ],
  "backlog": [
    { "issue_number": 3, "title": "...", "estimated_hours": 8, "reason": "deferred" }
  ],
  "total_estimated_hours": 40,
  "team_size_recommended": 2
}`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 900,
        messages: [
          {
            role: "system",
            content:
              "You are a senior engineering manager. Respond ONLY in valid JSON format, no other text.",
          },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Groq API error: ${res.status} ${errText.slice(0, 200)}`);
    }
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    return extractSprintPlan(content);
  });
