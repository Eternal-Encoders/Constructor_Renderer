interface GPS {
  centre: number;
  floor: number;
}

export interface BuildingSchema {
  id: string;
  project: string;
  //projectId: string;
  name: string;
  status: boolean;
  displayable_name: string;
  description?: string;
  url: string;
  latitude: number;
  longitude: number;
  last_floor_id: string;
  gps?: GPS;
  created_at: Date;
  updated_at: Date;
  updated_by?: string;
  isLoading: boolean;
  patchIsLoading: boolean;
  deleteIsLoading: boolean;
  error?: string;
  patchError?: string;
  deleteError?: string;
}

export interface Building {
  id: string;
  project: string;
  name: string;
  displayable_name: string;
  description?: string;
  url: string;
  latitude: number;
  longitude: number;
  last_floor_id: string;
  gps?: GPS;
  created_at: Date;
  updated_at: Date;
  updated_by?: string;
}