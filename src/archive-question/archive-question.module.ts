import { Module } from '@nestjs/common';
import { ArchiveQuestionGateway } from './archive-question.gateway';

@Module({
  providers: [ArchiveQuestionGateway]
})
export class ArchiveQuestionModule {}
