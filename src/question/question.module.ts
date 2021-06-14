import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Question, QuestionEntity } from "./entities/question.entity";
import { QuestionGateway } from "./question.gateway";
import { QuestionService } from './question.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionEntity.name, schema: Question },
    ]),
  ],
  providers: [QuestionGateway, QuestionService],
})
export class QuestionModule {}
