import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "src/auth/interfaces/user-role.interface";

@Schema({ collection: "users" })
export class UserEntity extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: UserRole })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
