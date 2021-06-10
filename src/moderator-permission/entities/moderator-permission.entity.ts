import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "moderator_permissions" })
export class ModeratorPermissionEntity extends Document {
  @Prop({ default: false })
  isViewEnable: boolean;

  @Prop({ default: false })
  canPlaceRemarks: boolean;

  @Prop({ default: false })
  canEditRemarks: boolean;

  @Prop({ default: false })
  canEditQuestions: boolean;
}

export const ModeratorPermission = SchemaFactory.createForClass(
  ModeratorPermissionEntity
);
