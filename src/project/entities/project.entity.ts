import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "projects" })
export class ProjectEntity extends Document {
  @Prop()
  title: string;

  @Prop()
  scheduleDate: Date;

  @Prop()
  startTime: string;

  @Prop()
  endTime: string;
}

export const Project = SchemaFactory.createForClass(ProjectEntity);
