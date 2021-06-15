import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { ProjectEntity } from "src/project/entities/project.entity";
import { QuestionEntity } from "src/question/entities/question.entity";

@Schema({ collection: "incoming_questions" })
export class IncomingQuestionEntity extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ProjectEntity.name })
  project: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: QuestionEntity.name }],
  })
  questions: string[];
}

export const IncomingQuestion = SchemaFactory.createForClass(
  IncomingQuestionEntity
);
