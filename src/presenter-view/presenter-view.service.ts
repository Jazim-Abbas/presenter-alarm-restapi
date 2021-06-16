import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeleteQuestionIdDto } from "src/common/dtos/delete-question-id.dto";
import { GeneralQuestionService } from "src/common/services/general-question.service";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { QuestionService } from "src/question/question.service";
import { PresenterViewEntity } from "./entities/presenter-view.entity";

@Injectable()
export class PresenterViewService extends GeneralQuestionService<PresenterViewEntity> {
  constructor(
    @InjectModel(PresenterViewEntity.name)
    protected readonly presenterViewModel: Model<PresenterViewEntity>,
    protected readonly questionService: QuestionService
  ) {
    super(presenterViewModel, questionService);
  }

  async getAllQuestions() {
    return this.getAll();
  }

  async savePresenterQuestion(createQuestionDto: CreateQuestionDto) {
    return this.saveQuestionForSections(createQuestionDto);
  }

  async deletePresenterQuestion(deleteQuestionDto: DeleteQuestionIdDto) {
    return this.deleteQuestionFromSection(deleteQuestionDto);
  }
}
