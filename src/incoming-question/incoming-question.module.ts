import { Module } from '@nestjs/common';
import { IncomingQuestionGateway } from './incoming-question.gateway';

@Module({
  providers: [IncomingQuestionGateway]
})
export class IncomingQuestionModule {}
