interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="rounded-xl border border-red-500/40 bg-red-500/5 p-4 shadow-lg">
      <div className="flex items-start gap-3">
        <span className="text-lg">⚠️</span>
        <div className="flex-1">
          <p className="text-sm text-red-200">{message}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 rounded-md border border-red-500/40 px-3 py-1.5 text-xs font-medium text-red-200 transition hover:bg-red-500/10"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}