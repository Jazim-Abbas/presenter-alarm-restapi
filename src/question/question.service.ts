import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateQuestionDto } from "./dtos/create-question.dto";
import { QuestionEntity } from "./entities/question.entity";

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(QuestionEntity.name)
    private readonly questionModel: Model<QuestionEntity>
  ) {}

  async saveQuestion(createQuestionDto: CreateQuestionDto) {
    const question = new this.questionModel({ ...createQuestionDto });
    return await question.save();
  }
}
