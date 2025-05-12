export interface ProjectSchema {
  id: string;
  name: string;
  description?: string;
  url: string;
  created_at: Date;
  updated_at: Date;
  isLoading: boolean;
  patchIsLoading: boolean;
  deleteIsLoading: boolean;
  error?: string;
  patchError?: string;
  deleteError?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  url: string;
  created_at: Date;
  updated_at: Date;
}