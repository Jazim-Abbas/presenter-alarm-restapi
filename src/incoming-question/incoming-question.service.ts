import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeleteQuestionIdDto } from "src/common/dtos/delete-question-id.dto";
import { MoveQuestionDto } from "src/common/dtos/move-question.dto";
import { GeneralQuestionService } from "src/common/services/general-question.service";
import { ModeratorViewService } from "src/moderator-view/moderator-view.service";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { QuestionService } from "src/question/question.service";
import { IncomingQuestionEntity } from "./entities/incoming-question.entity";

@Injectable()
export class IncomingQuestionService extends GeneralQuestionService<IncomingQuestionEntity> {
  constructor(
    @InjectModel(IncomingQuestionEntity.name)
    protected readonly incomingQuestionModel: Model<IncomingQuestionEntity>,
    protected readonly questionService: QuestionService,
    private readonly moderatorViewService: ModeratorViewService
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

  async moveQuestionToModeratorView(moveQuestionDto: MoveQuestionDto) {
    await this.moderatorViewService.moveQuestion(moveQuestionDto);
    await this.deleteIncomingQuestion(moveQuestionDto);
  }
}
