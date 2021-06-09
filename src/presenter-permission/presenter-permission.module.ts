import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  PresenterPermission,
  PresenterPermissionEntity,
} from "./entities/presenter-permission.entity";
import { PresenterPermissionController } from "./presenter-permission.controller";
import { PresenterPermissionService } from "./presenter-permission.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PresenterPermissionEntity.name, schema: PresenterPermission },
    ]),
  ],
  controllers: [PresenterPermissionController],
  providers: [PresenterPermissionService],
})
export class PresenterPermissionModule {}
