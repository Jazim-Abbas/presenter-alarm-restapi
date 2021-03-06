import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeleteQuestionIdDto } from "src/common/dtos/delete-question-id.dto";
import { MoveQuestionDto } from "src/common/dtos/move-question.dto";
import { GeneralQuestionService } from "src/common/services/general-question.service";
import { LiveQuestionService } from "src/live-question/live-question.service";
import { PresenterViewService } from "src/presenter-view/presenter-view.service";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { QuestionService } from "src/question/question.service";
import { ModeratorViewEntity } from "./entities/moderator-view.entity";

@Injectable()
export class ModeratorViewService extends GeneralQuestionService<ModeratorViewEntity> {
  constructor(
    @InjectModel(ModeratorViewEntity.name)
    protected readonly moderatorViewModel: Model<ModeratorViewEntity>,
    protected readonly questionService: QuestionService,
    private readonly liveQuestionService: LiveQuestionService,
    private readonly presenterService: PresenterViewService
  ) {
    super(moderatorViewModel, questionService);
  }

  async getAllQuestions() {
    return this.getAll();
  }

  async saveModeratorQuestion(createQuestionDto: CreateQuestionDto) {
    return this.saveQuestionForSections(createQuestionDto);
  }

  async deleteModeratorQuestion(deleteQuestionDto: DeleteQuestionIdDto) {
    return this.deleteQuestionFromSection(deleteQuestionDto);
  }

  async moveQuestionToLiveQuestion(moveQuestionDto: MoveQuestionDto) {
    await this.presenterService.moveQuestion(moveQuestionDto);
    await this.deleteModeratorQuestion(moveQuestionDto);
  }
}
