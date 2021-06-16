import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
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
  ],
  providers: [PresenterViewGateway, PresenterViewService],
})
export class PresenterViewModule {}
