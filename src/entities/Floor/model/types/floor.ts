import { Decoration, GraphPoint, Room } from "shared/const/API";

export interface FloorSchema {
  id: string;
  index: number;
  name: string;
  building_id: string;
  width?: number;
  height?: number;
  decorations: Decoration[];
  rooms: Room[];
  graph_points: GraphPoint[];
  // forces?: Forces[];
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

export interface Floor {
  id: string;
  index: number;
  name: string;
  building_id: string;
  width?: number;
  height?: number;
  decorations: Decoration[];
  rooms: Room[];
  graph_points: GraphPoint[];
  // forces?: Forces[];
  created_at: Date;
  updated_at: Date;
  updated_by?: string;
}