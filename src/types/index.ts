export interface AIAnalysis {
  root_cause: string;
  suggested_fix: string;
  complexity: "Low" | "Medium" | "High";
  priority: "Low" | "Medium" | "High" | "Critical";
}

export interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  labels: string[];
  ai_analysis: AIAnalysis;
}

export interface AnalysisResult {
  repo: string;
  total_issues: number;
  issues: GitHubIssue[];
}

export interface SprintTask {
  issue_number: number;
  title: string;
  estimated_hours: number;
  reason?: string;
}

export interface SprintPlan {
  sprint_goal: string;
  week_1: SprintTask[];
  week_2: SprintTask[];
  backlog: SprintTask[];
  total_estimated_hours: number;
  team_size_recommended: number;
}