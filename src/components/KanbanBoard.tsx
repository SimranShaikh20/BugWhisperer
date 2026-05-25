import { useState } from "react";
import type { GitHubIssue } from "@/types";

const COLUMNS: Array<{
  key: "Critical" | "High" | "Medium" | "Low";
  header: string;
  ring: string;
}> = [
  { key: "Critical", header: "bg-red-600 text-white", ring: "ring-red-500/40" },
  { key: "High", header: "bg-orange-500 text-white", ring: "ring-orange-500/40" },
  { key: "Medium", header: "bg-yellow-500 text-gray-900", ring: "ring-yellow-500/40" },
  { key: "Low", header: "bg-green-600 text-white", ring: "ring-green-500/40" },
];

const COMPLEXITY: Record<string, string> = {
  Low: "bg-green-500/15 text-green-300 ring-green-500/30",
  Medium: "bg-yellow-500/15 text-yellow-300 ring-yellow-500/30",
  High: "bg-red-500/15 text-red-300 ring-red-500/30",
};

function KanbanCard({ issue }: { issue: GitHubIssue }) {
  const [open, setOpen] = useState(false);
  const a = issue.ai_analysis;
  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="w-full rounded-lg border border-gray-800 bg-gray-900 p-3 text-left transition hover:border-blue-500/40"
    >
      <div className="mb-1.5 text-sm font-semibold text-gray-100">
        <span className="text-gray-500">#{issue.number}</span> {issue.title}
      </div>
      <div className="mb-2">
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${COMPLEXITY[a.complexity] ?? COMPLEXITY.Medium}`}
        >
          {a.complexity}
        </span>
      </div>
      {open ? (
        <div className="space-y-2 text-xs text-gray-300">
          <div>
            <p className="font-semibold uppercase tracking-wide text-gray-400">Root Cause</p>
            <p>{a.root_cause}</p>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-wide text-gray-400">Suggested Fix</p>
            <p>{a.suggested_fix}</p>
          </div>
        </div>
      ) : (
        <p className="line-clamp-1 text-xs text-gray-400">{a.root_cause}</p>
      )}
    </button>
  );
}

export function KanbanBoard({ issues }: { issues: GitHubIssue[] }) {
  const grouped = COLUMNS.map((col) => ({
    ...col,
    items: issues.filter((i) => i.ai_analysis.priority === col.key),
  }));

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {grouped.map((col) => (
        <div
          key={col.key}
          className={`rounded-xl bg-gray-950 ring-1 ${col.ring}`}
        >
          <div
            className={`flex items-center justify-between rounded-t-xl px-3 py-2 text-sm font-semibold ${col.header}`}
          >
            <span>{col.key}</span>
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs">
              {col.items.length}
            </span>
          </div>
          <div className="flex flex-col gap-2 p-2">
            {col.items.length === 0 ? (
              <p className="px-1 py-3 text-center text-xs text-gray-600">
                No issues
              </p>
            ) : (
              col.items.map((i) => <KanbanCard key={i.number} issue={i} />)
            )}
          </div>
        </div>
      ))}
    </div>
  );
}