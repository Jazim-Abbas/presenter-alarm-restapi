import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuestionModule } from "src/question/question.module";
import {
  IncomingQuestion,
  IncomingQuestionEntity,
} from "./entities/incoming-question.entity";
import { IncomingQuestionGateway } from "./incoming-question.gateway";
import { IncomingQuestionService } from "./incoming-question.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IncomingQuestionEntity.name, schema: IncomingQuestion },
    ]),
    QuestionModule,
  ],
  providers: [IncomingQuestionGateway, IncomingQuestionService],
  exports: [IncomingQuestionService],
})
export class IncomingQuestionModule {}
