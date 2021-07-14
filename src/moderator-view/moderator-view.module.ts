import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LiveQuestionModule } from "src/live-question/live-question.module";
import { PresenterViewModule } from "src/presenter-view/presenter-view.module";
import { QuestionModule } from "src/question/question.module";
import {
  ModeratorView,
  ModeratorViewEntity,
} from "./entities/moderator-view.entity";
import { ModeratorViewGateway } from "./moderator-view.gateway";
import { ModeratorViewService } from "./moderator-view.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModeratorViewEntity.name, schema: ModeratorView },
    ]),
    QuestionModule,
    LiveQuestionModule,
    PresenterViewModule,
  ],
  providers: [ModeratorViewGateway, ModeratorViewService],
  exports: [ModeratorViewService],
})
export class ModeratorViewModule {}
