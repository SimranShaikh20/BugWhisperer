import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { RepoInput } from "@/components/RepoInput";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { IssueList } from "@/components/IssueList";
import { useAnalyzeRepo } from "@/hooks/useAnalyzeRepo";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "BugWhisperer — AI GitHub issue triage" },
      {
        name: "description",
        content:
          "Analyze open issues in any public GitHub repository with AI. Get root cause, suggested fix, complexity, and priority.",
      },
    ],
  }),
});

function Index() {
  const { result, loading, error, analyzeRepo, clearError } = useAnalyzeRepo();
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <Header />
        <RepoInput onSubmit={analyzeRepo} loading={loading} />
        {loading && <LoadingSpinner />}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={clearError} />
        )}
        {result && !loading && !error && <IssueList result={result} />}
        {!result && !loading && !error && (
          <p className="text-center text-sm text-gray-500">
            Try{" "}
            <code className="rounded bg-gray-900 px-1.5 py-0.5 text-gray-300">
              https://github.com/fastapi/fastapi
            </code>
          </p>
        )}
      </div>
    </main>
  );
}
