import { Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { Question, QuestionEntity } from "./entities/question.entity";
import { QuestionGateway } from "./question.gateway";
import { QuestionService } from "./question.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionEntity.name, schema: Question },
    ]),
  ],
  providers: [
    QuestionGateway,
    QuestionService,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class QuestionModule {}
