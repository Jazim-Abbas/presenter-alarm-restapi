import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuestionModule } from "src/question/question.module";
import { ArchiveQuestionGateway } from "./archive-question.gateway";
import {
  ArchivedQuestion,
  ArchivedQuestionEntity,
} from "./entities/archive-question.entity";
import { ArchiveQuestionService } from "./archive-question.service";
import { PresenterViewModule } from "src/presenter-view/presenter-view.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArchivedQuestionEntity.name, schema: ArchivedQuestion },
    ]),
    QuestionModule,
    forwardRef(() => PresenterViewModule),
  ],
  providers: [ArchiveQuestionGateway, ArchiveQuestionService],
  exports: [ArchiveQuestionService],
})
export class ArchiveQuestionModule {}
