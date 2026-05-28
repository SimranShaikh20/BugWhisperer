export function parseRepoUrl(url: string): { owner: string; repo: string } {
  const m = url.trim().match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i);
  if (!m) throw new Error("Invalid GitHub URL. Use https://github.com/owner/repo");
  return { owner: m[1], repo: m[2] };
}

export interface RawIssue {
  number: number;
  title: string;
  body: string | null;
  labels: Array<{ name: string } | string>;
  pull_request?: unknown;
}

export async function fetchIssues(owner: string, repo: string, limit = 5) {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=${limit}`,
    { headers },
  );
  if (res.status === 401) throw new Error("GitHub authentication failed");
  if (res.status === 403) throw new Error("GitHub rate limit exceeded, please try again later");
  if (res.status === 404) throw new Error("Repository not found, please check the URL");
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = (await res.json()) as RawIssue[];
  return data
    .filter((i) => !i.pull_request)
    .slice(0, limit)
    .map((i) => ({
      number: i.number,
      title: i.title,
      body: i.body ?? "",
      labels: i.labels.map((l) => (typeof l === "string" ? l : l.name)),
    }));
}