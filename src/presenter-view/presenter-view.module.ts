import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  PresenterView,
  PresenterViewEntity,
} from "./entities/presenter-view.entity";
import { PresenterViewGateway } from "./presenter-view.gateway";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PresenterViewEntity.name, schema: PresenterView },
    ]),
  ],
  providers: [PresenterViewGateway],
})
export class PresenterViewModule {}
