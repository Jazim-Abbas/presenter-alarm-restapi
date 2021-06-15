import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IncomingQuestionEntity } from "./entities/incoming-question.entity";

@Injectable()
export class IncomingQuestionService {
  constructor(
    @InjectModel(IncomingQuestionEntity.name)
    private readonly incomingQuestionModel: Model<IncomingQuestionEntity>
  ) {}
}
