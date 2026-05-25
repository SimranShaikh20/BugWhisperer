import type { GitHubIssue } from "@/types";

const COMPLEXITY: Record<string, string> = {
  Low: "bg-green-500/15 text-green-300 ring-green-500/30",
  Medium: "bg-yellow-500/15 text-yellow-300 ring-yellow-500/30",
  High: "bg-red-500/15 text-red-300 ring-red-500/30",
};
const PRIORITY: Record<string, string> = {
  Low: "bg-green-500/15 text-green-300 ring-green-500/30",
  Medium: "bg-yellow-500/15 text-yellow-300 ring-yellow-500/30",
  High: "bg-orange-500/15 text-orange-300 ring-orange-500/30",
  Critical: "bg-red-500/15 text-red-300 ring-red-500/30",
};

export function IssueCard({
  issue,
  index,
}: {
  issue: GitHubIssue;
  index: number;
}) {
  const { ai_analysis: a } = issue;
  return (
    <article
      style={{ animationDelay: `${index * 100}ms` }}
      className="animate-[fadeIn_0.4s_ease-out_both] rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-lg transition hover:border-blue-500/40 hover:shadow-blue-500/10"
    >
      <header className="mb-3">
        <h3 className="text-base font-semibold text-gray-100">
          <span className="text-gray-500">#{issue.number}</span> {issue.title}
        </h3>
        {issue.labels.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {issue.labels.map((l) => (
              <span
                key={l}
                className="rounded-full bg-gray-800 px-2 py-0.5 text-[11px] font-medium text-gray-300 ring-1 ring-gray-700"
              >
                {l}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="rounded-lg bg-gray-950/60 p-4 ring-1 ring-gray-800">
        <div className="mb-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
            🔍 Root Cause
          </p>
          <p className="text-sm text-gray-200">{a.root_cause}</p>
        </div>
        <div className="mb-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
            🔧 Suggested Fix
          </p>
          <p className="text-sm text-gray-200">{a.suggested_fix}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${COMPLEXITY[a.complexity] ?? COMPLEXITY.Medium}`}
          >
            Complexity: {a.complexity}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${PRIORITY[a.priority] ?? PRIORITY.Medium}`}
          >
            Priority: {a.priority}
          </span>
        </div>
      </div>
    </article>
  );
}