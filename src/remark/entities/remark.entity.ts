import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { ProjectEntity } from "src/project/entities/project.entity";

@Schema({ collection: "remarks" })
export class RemarkEntity extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProjectEntity.name })
  project: string;

  @Prop()
  descripting: string;
}

export const Remark = SchemaFactory.createForClass(RemarkEntity);
