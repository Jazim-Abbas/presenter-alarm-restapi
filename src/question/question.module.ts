import { Module } from '@nestjs/common';
import { QuestionGateway } from './question.gateway';

@Module({
  providers: [QuestionGateway]
})
export class QuestionModule {}
