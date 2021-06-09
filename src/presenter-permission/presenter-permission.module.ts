import { Module } from '@nestjs/common';
import { PresenterPermissionController } from './presenter-permission.controller';

@Module({
  controllers: [PresenterPermissionController]
})
export class PresenterPermissionModule {}
