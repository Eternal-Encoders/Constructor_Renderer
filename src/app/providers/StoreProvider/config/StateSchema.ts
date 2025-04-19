import { BackgroundSchema } from "entities/Background";
import { CounterSchema } from "entities/Counter";
import { ImageSchema } from "entities/Image/model/types/imageSchema";
import { UserSchema } from "entities/User";

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema
  image: ImageSchema
  background: BackgroundSchema
}