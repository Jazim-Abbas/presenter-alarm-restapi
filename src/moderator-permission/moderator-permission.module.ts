import { Module } from '@nestjs/common';
import { ModeratorPermissionController } from './moderator-permission.controller';

@Module({
  controllers: [ModeratorPermissionController]
})
export class ModeratorPermissionModule {}
