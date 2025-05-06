import { CreateGraphPointFromFloorDto, Decoration, Forces, Room } from "shared/const/API";

export interface UpdateFloorSchema {
  floor_number?:	number;
  floor_name?:	string | null;
  building_id?:	string;
  image_id?:	string | null;
  width?:	number;
  height?:	number;
  decorations?:	Decoration[];
  graph_points?: CreateGraphPointFromFloorDto[];
  rooms?:	Room[];
  forces?:	Forces[] | null;
}