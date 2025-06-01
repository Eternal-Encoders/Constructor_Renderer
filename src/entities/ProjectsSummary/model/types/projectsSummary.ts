export interface ProjectSummary {
  id: string;
  name: string;
  status: boolean;
}

export interface ProjectSummarySchema {
  projects?: ProjectSummary[];
  isLoading: boolean;
  error?: string;
}