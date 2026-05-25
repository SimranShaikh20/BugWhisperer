import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import type { AnalysisResult, SprintPlan } from "@/types";
import { generateSprintPlan } from "@/lib/analyze.functions";
import { downloadMarkdownReport } from "@/lib/export-markdown";
import { KanbanBoard } from "./KanbanBoard";
import { SprintPlanView } from "./SprintPlanView";

export function IssueList({ result }: { result: AnalysisResult }) {
  const [plan, setPlan] = useState<SprintPlan | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const callPlan = useServerFn(generateSprintPlan);

  const onGeneratePlan = async () => {
    setLoadingPlan(true);
    setPlanError(null);
    try {
      const data = await callPlan({
        data: {
          issues: result.issues.map((i) => ({
            number: i.number,
            title: i.title,
            ai_analysis: i.ai_analysis,
          })),
        },
      });
      setPlan(data);
    } catch (e) {
      setPlanError(e instanceof Error ? e.message : "Failed to generate plan");
    } finally {
      setLoadingPlan(false);
    }
  };

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold text-gray-100">
          📦 {result.repo}
        </h2>
        <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300 ring-1 ring-blue-500/30">
          {result.total_issues} open issues analyzed
        </span>
        <button
          type="button"
          onClick={() => downloadMarkdownReport(result, plan)}
          className="ml-auto rounded-md bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-100 ring-1 ring-gray-700 transition hover:bg-gray-700"
        >
          ⬇️ Export Report
        </button>
      </div>

      <KanbanBoard issues={result.issues} />

      <div className="mt-6 flex flex-col items-start gap-2">
        <button
          type="button"
          onClick={onGeneratePlan}
          disabled={loadingPlan}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loadingPlan ? "Generating sprint plan…" : "✨ Generate Sprint Plan"}
        </button>
        {planError && (
          <p className="text-xs text-red-400">{planError}</p>
        )}
      </div>

      {plan && <SprintPlanView plan={plan} />}
    </section>
  );
}