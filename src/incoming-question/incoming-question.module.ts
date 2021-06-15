import { Module } from '@nestjs/common';
import { IncomingQuestionGateway } from './incoming-question.gateway';
import { IncomingQuestionService } from './incoming-question.service';

@Module({
  providers: [IncomingQuestionGateway, IncomingQuestionService]
})
export class IncomingQuestionModule {}
