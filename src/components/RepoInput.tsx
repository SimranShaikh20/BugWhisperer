import { useState, type KeyboardEvent } from "react";
import { Bug, Loader2 } from "lucide-react";

interface Props {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export function RepoInput({ onSubmit, loading }: Props) {
  const [url, setUrl] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const submit = () => {
    if (!url.trim()) return setErr("Please enter a repository URL");
    if (!/github\.com/i.test(url)) return setErr("URL must include github.com");
    setErr(null);
    onSubmit(url.trim());
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={onKey}
          disabled={loading}
          placeholder="https://github.com/owner/repo"
          className="w-full flex-1 rounded-xl border border-gray-800 bg-gray-900 px-4 py-3 text-gray-100 placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 disabled:opacity-60"
        />
        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Bug className="h-4 w-4" />
          )}
          Analyze Issues
        </button>
      </div>
      {err && <p className="mt-2 text-sm text-red-400">{err}</p>}
    </div>
  );
}