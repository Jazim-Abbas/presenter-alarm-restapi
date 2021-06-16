import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { ProjectEntity } from "src/project/entities/project.entity";
import { QuestionEntity } from "src/question/entities/question.entity";

@Schema({ collection: "live_questions" })
export class LiveQuestionEntity extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProjectEntity.name })
  project: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: QuestionEntity.name }],
  })
  questions: string[];
}

export const LiveQuestion = SchemaFactory.createForClass(LiveQuestionEntity);
