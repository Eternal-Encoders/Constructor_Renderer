interface GPS {
  centre: number;
  floor: number;
}

export interface AddBuildingSchema {
  project_id: string;
  name: string;
  displayable_name: string;
  description?: string;
  url: string;
  latitude: number;
  longitude: number;
  gps?: GPS;
  isLoading: boolean;
  error?: string;
}