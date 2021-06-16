import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ModeratorViewModule } from "src/moderator-view/moderator-view.module";
import { PresenterViewModule } from "src/presenter-view/presenter-view.module";
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
    ModeratorViewModule,
    PresenterViewModule,
  ],
  providers: [IncomingQuestionGateway, IncomingQuestionService],
  exports: [IncomingQuestionService],
})
export class IncomingQuestionModule {}
