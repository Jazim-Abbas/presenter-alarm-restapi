import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { ProjectEntity } from "src/project/entities/project.entity";

@Schema({ collection: "questions" })
export class QuestionEntity extends Document {
  @Prop()
  name: string;

  @Prop()
  qusetionText: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProjectEntity.name })
  project: ProjectEntity;
}

export const Question = SchemaFactory.createForClass(QuestionEntity);
