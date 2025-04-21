import { BackgroundSchema } from "entities/Background";
import { CounterSchema } from "entities/Counter";
import { ImageSchema } from "entities/Image";
import { LayoutSchema } from "entities/Layout";
import { UserSchema } from "entities/User";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema
  image: ImageSchema
  background: BackgroundSchema
  layout: LayoutSchema
}