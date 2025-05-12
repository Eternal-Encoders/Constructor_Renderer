export interface ProjectSummary {
  id: string;
  name: string;
}

export interface ProjectSummarySchema {
  projects?: ProjectSummary[];
  isLoading: boolean;
  error?: string;
}