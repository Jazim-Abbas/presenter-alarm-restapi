import { Module } from '@nestjs/common';
import { ModeratorViewGateway } from './moderator-view.gateway';

@Module({
  providers: [ModeratorViewGateway]
})
export class ModeratorViewModule {}
