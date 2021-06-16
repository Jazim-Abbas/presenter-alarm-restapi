import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuestionModule } from "src/question/question.module";
import { ArchiveQuestionGateway } from "./archive-question.gateway";
import {
  ArchivedQuestion,
  ArchivedQuestionEntity,
} from "./entities/archive-question.entity";
import { ArchiveQuestionService } from "./archive-question.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArchivedQuestionEntity.name, schema: ArchivedQuestion },
    ]),
    QuestionModule,
  ],
  providers: [ArchiveQuestionGateway, ArchiveQuestionService],
  exports: [ArchiveQuestionService],
})
export class ArchiveQuestionModule {}
