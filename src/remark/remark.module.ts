import { Module } from '@nestjs/common';
import { RemarkGateway } from './remark.gateway';

@Module({
  providers: [RemarkGateway]
})
export class RemarkModule {}
