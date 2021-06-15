import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeleteQuestionIdDto } from "src/common/dtos/delete-question-id.dto";
import { GeneralQuestionService } from "src/common/services/general-question.service";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { QuestionService } from "src/question/question.service";
import { CreateIncomingQuestionDto } from "./dtos/create-incoming-question.dto";
import { DeleteIncomingQuestionDto } from "./dtos/delete-incoming-question.dto";
import { IncomingQuestionEntity } from "./entities/incoming-question.entity";

@Injectable()
export class IncomingQuestionService extends GeneralQuestionService<IncomingQuestionEntity> {
  constructor(
    @InjectModel(IncomingQuestionEntity.name)
    readonly incomingQuestionModel: Model<IncomingQuestionEntity>,
    readonly questionService: QuestionService
  ) {
    super(incomingQuestionModel, questionService);
  }

  async getAllQuestions() {
    return this.getAll();
  }

  async saveIncomingQuestion(createQuestionDto: CreateQuestionDto) {
    return this.saveQuestionForSections(createQuestionDto);
  }

  async deleteIncomingQuestion(deleteQuestionDto: DeleteQuestionIdDto) {
    return this.deleteQuestionFromSection(deleteQuestionDto);
  }
}
