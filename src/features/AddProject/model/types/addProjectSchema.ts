export interface AddProjectSchema {
  name: string;
  description?: string;
  url: string;
  isLoading: boolean;
  error?: string;
}