import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "presenter_permissions" })
export class PresenterPermissionEntity extends Document {
  @Prop({ default: false })
  isTimeVisible: boolean;

  @Prop({ default: false })
  isCommentingPersonNameVisible: boolean;

  @Prop({ default: false })
  isStartTimeVisible: boolean;

  @Prop({ default: false })
  isRunningTimeVisible: boolean;

  @Prop({ default: false })
  isTimeLeftVisible: boolean;

  @Prop({ default: false })
  isRemarksVisible: boolean;

  @Prop({ default: false })
  isCheckmarkBtnVisible: boolean;
}

export const PresenterPermission = SchemaFactory.createForClass(
  PresenterPermissionEntity
);
