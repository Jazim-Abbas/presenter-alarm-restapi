import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeleteQuestionIdDto } from "src/common/dtos/delete-question-id.dto";
import { MoveQuestionDto } from "src/common/dtos/move-question.dto";
import { GeneralQuestionService } from "src/common/services/general-question.service";
import { PresenterViewService } from "src/presenter-view/presenter-view.service";
import { QuestionService } from "src/question/question.service";
import { ArchivedQuestionEntity } from "./entities/archive-question.entity";

@Injectable()
export class ArchiveQuestionService extends GeneralQuestionService<ArchivedQuestionEntity> {
  constructor(
    @InjectModel(ArchivedQuestionEntity.name)
    protected readonly archivedQuestionModel: Model<ArchivedQuestionEntity>,
    protected readonly questionService: QuestionService,
    @Inject(forwardRef(() => PresenterViewService))
    protected readonly presenterService: PresenterViewService
  ) {
    super(archivedQuestionModel, questionService);
  }

  async getAllQuestions() {
    return this.getAll();
  }

  async deleteQuestion(deleteQuestionDto: DeleteQuestionIdDto) {
    return this.deleteQuestionFromSection(deleteQuestionDto);
  }

  async moveQuestionToPresenter(moveQuestionDto: MoveQuestionDto) {
    
  }
}
