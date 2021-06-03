import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "users"})
export class UserEntity extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Boolean, default: false })
  isSuperUser: boolean;

  @Prop({ type: Boolean, default: false })
  isAdmin: boolean;

  @Prop({ type: Boolean, default: true })
  isModerator: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);