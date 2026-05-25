import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { analyzeRepo } from "@/lib/analyze.functions";
import type { AnalysisResult } from "@/types";

export function useAnalyzeRepo() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const call = useServerFn(analyzeRepo);

  const run = async (repoUrl: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await call({ data: { repo_url: repoUrl } });
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    error,
    analyzeRepo: run,
    clearError: () => setError(null),
  };
}