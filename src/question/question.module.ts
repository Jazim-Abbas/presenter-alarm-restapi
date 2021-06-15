import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectModule } from "src/project/project.module";
import { Question, QuestionEntity } from "./entities/question.entity";
import { QuestionGateway } from "./question.gateway";
import { QuestionService } from "./question.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionEntity.name, schema: Question },
    ]),
    ProjectModule,
  ],
  providers: [QuestionGateway, QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
