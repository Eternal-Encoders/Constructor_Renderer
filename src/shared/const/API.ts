export interface Coordinates {
  x: number;
  y: number;
}
  
export interface CreateImageDto {
  url: string;
  name?: string | null;
  filesize?: string | null;
}
  
export interface GPS {
  centre: number;
  floor: number;
}
  
export interface GraphPoint {
  id: string;
  x: number;
  y: number;
}
  
export interface CreateFloorSchema {
  floor_number:	number;
  floor_name?:	string | null;
  building_id:	string;
  image_id?:	string | null;
  width:	number;
  height:	number;
  decorations:	Decoration[];
  graph_points: CreateGraphPointFromFloorDto[];
  rooms:	Room[];
  forces?:	Forces[] | null;
}
  
export interface Decoration {
  x: number;
  y: number;
  data?: string | null;
  stroke: string;
  fiil?: string | null;
}
  
export interface CreateGraphPointFromFloorDto {
  id: string;
  x: number;
  y: number;
  links: string[];
  types: string[];
  name: string;
  synonyms: string[];
  time?: Day | null;
  description?: string | null;
  info?: string | null;
  is_pass_free: boolean;
  transition_id?: string | null;
}
  
export interface Day {
  is_day_off?: boolean;
  from: string;
  to: string;
}
  
export interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  points?: Coordinates | null;
  fill: string;
  stroke: string;
  // children: RoomChild[] | null;
  passages: Passage[];
  created_at?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
}
  
export interface Passage {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  created_at: string; 
  updated_at: string;
}
  
export interface Forces {
  point: Coordinates;
  force: Coordinates;
}
  
export interface CreateGraphPointDto {
  id: string;
  x: number;
  y: number;
  links: string[];
  types: string[];
  names: string;
  synonyms: string[];
  floor_id: string;
  time?: Day[] | null;
  description?: string | null;
  info?: string | null;
  is_pass_free: boolean;
  transition_id?: string | null;
}
  
export interface CreateProjectDto {
  name: string;
  description?: string | null;
  image?: CreateImageDto;
  url: string;
}

export interface CreateUserDto {
  nickname: string;
  email: string;
  password: string;
}

export interface GraphPointType {
  name: string;
  category?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
  updated_by?: string | null;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UpdateBuildingDto {
  project_id?: string | null;
  name?: string | null;
  displayable_name?: string | null;
  url?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  image_id?: CreateImageDto | null; 
  gps?: GPS;
}

export interface UpdateFloorDto {
  floor_number?: number | null;
  floor_name?: string | null;
  building_id?: string | null;
  image_id?: string | null;
  width?: number | null;
  height?: number | null;
  decorations?: Decoration[] | null;
  graph_points?: CreateGraphPointFromFloorDto[] | null;
  rooms?: Room[] | null;
  forces?: Forces[] | null;
}

export interface UpdateProjectDto {
  name?: string | null;
  url?: string | null;
  description?: string | null;
  image_id?: string | null;
  custom_graph_point_types?: GraphPointType[] | null;
}

export interface UpdateUserDto {
  nickname?: string | null;
  email?: string | null;
  password?: string | null;
}