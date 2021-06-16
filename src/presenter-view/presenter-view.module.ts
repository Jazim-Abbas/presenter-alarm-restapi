import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArchiveQuestionModule } from "src/archive-question/archive-question.module";
import { QuestionModule } from "src/question/question.module";
import {
  PresenterView,
  PresenterViewEntity,
} from "./entities/presenter-view.entity";
import { PresenterViewGateway } from "./presenter-view.gateway";
import { PresenterViewService } from "./presenter-view.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PresenterViewEntity.name, schema: PresenterView },
    ]),
    QuestionModule,
    ArchiveQuestionModule,
  ],
  providers: [PresenterViewGateway, PresenterViewService],
  exports: [PresenterViewService],
})
export class PresenterViewModule {}
