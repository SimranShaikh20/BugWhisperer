export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-800 border-t-blue-500" />
      <p className="mt-4 text-sm font-medium text-gray-200">
        Fetching issues from GitHub...
      </p>
      <p className="mt-1 text-xs text-gray-500">Analyzing with Groq AI...</p>
    </div>
  );
}