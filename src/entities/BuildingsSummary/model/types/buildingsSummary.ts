export interface BuildingSummary {
  id: string;
  name: string;
}

export interface BuildingSummarySchema {
  buildings?: BuildingSummary[];
  isLoading: boolean;
  error?: string;
}