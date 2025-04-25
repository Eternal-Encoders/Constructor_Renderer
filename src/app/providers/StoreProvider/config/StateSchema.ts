import { CounterSchema } from "entities/Counter";
import { FillSchema } from "entities/Fill";
import { ImageSchema } from "entities/Image";
import { LayersSchema } from "entities/Layers";
import { LayoutSchema } from "entities/Layout";
import { UserSchema } from "entities/User";
import { LoginSchema } from "features/AuthByUsername";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  fill: FillSchema;
  image: ImageSchema;
  layout: LayoutSchema;
  layers: LayersSchema;
  loginForm: LoginSchema;
}