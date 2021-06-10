import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ModeratorPermission,
  ModeratorPermissionEntity,
} from "./entities/moderator-permission.entity";
import { ModeratorPermissionController } from "./moderator-permission.controller";
import { ModeratorPermissionService } from './moderator-permission.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModeratorPermissionEntity.name, schema: ModeratorPermission },
    ]),
  ],
  controllers: [ModeratorPermissionController],
  providers: [ModeratorPermissionService],
})
export class ModeratorPermissionModule {}
