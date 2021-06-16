import { Module } from '@nestjs/common';
import { LiveQuestionGateway } from './live-question.gateway';

@Module({
  providers: [LiveQuestionGateway]
})
export class LiveQuestionModule {}
