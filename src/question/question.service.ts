import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuestionEntity } from "./entities/question.entity";

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(QuestionEntity.name)
    private readonly questionModel: Model<QuestionEntity>
  ) {}
}
