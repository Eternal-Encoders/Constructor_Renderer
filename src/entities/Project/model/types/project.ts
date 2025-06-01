import { GraphPointType } from "shared/const/API";
import { Icon } from "./icon";

export interface ProjectSchema {
  id: string;
  name: string;
  buildingIds: string[];
  customGraphPointTypes: GraphPointType[];
  imageId: string | null;
  description?: string;
  url: string;
  icon: Icon;
  status: boolean;
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
  icon: Icon;
  buildingIds: string[];
  customGraphPointTypes: GraphPointType[];
  imageId: string | null;
  description?: string;
  url: string;
  created_at: Date;
  updated_at: Date;
}