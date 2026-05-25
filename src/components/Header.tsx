import { Bug } from "lucide-react";

export function Header() {
  return (
    <header className="mb-8 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30">
        <Bug className="h-5 w-5" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-100">
          BugWhisperer
        </h1>
        <p className="text-sm text-gray-400">AI-powered GitHub issue triage</p>
      </div>
    </header>
  );
}