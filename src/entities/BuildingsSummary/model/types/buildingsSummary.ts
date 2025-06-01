export interface BuildingSummary {
  id: string;
  name: string;
  status: boolean;
  updated_at: Date;
}

export interface BuildingSummarySchema {
  buildings?: BuildingSummary[];
  isLoading: boolean;
  error?: string;
}