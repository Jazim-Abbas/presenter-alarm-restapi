import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GeneralQuestionService } from "src/common/services/general-question.service";
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
}
