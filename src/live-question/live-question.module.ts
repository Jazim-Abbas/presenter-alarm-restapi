import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuestionModule } from "src/question/question.module";
import {
  LiveQuestion,
  LiveQuestionEntity,
} from "./entity/live-question.entity";
import { LiveQuestionGateway } from "./live-question.gateway";
import { LiveQuestionService } from "./live-question.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LiveQuestionEntity.name, schema: LiveQuestion },
    ]),
    QuestionModule,
  ],
  providers: [LiveQuestionGateway, LiveQuestionService],
})
export class LiveQuestionModule {}
