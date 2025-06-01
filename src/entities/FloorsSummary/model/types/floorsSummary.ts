export interface FloorSummary {
  id: string;
  name: string;
}

export interface FloorSummarySchema {
  floors?: FloorSummary[];
  isLoading: boolean;
  error?: string;
}