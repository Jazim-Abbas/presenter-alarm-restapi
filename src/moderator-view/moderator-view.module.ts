import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
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
  ],
  providers: [ModeratorViewGateway, ModeratorViewService],
})
export class ModeratorViewModule {}
