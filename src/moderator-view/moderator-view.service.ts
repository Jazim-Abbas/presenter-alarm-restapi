import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeleteQuestionIdDto } from "src/common/dtos/delete-question-id.dto";
import { GeneralQuestionService } from "src/common/services/general-question.service";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { QuestionService } from "src/question/question.service";
import { ModeratorViewEntity } from "./entities/moderator-view.entity";

@Injectable()
export class ModeratorViewService extends GeneralQuestionService<ModeratorViewEntity> {
  constructor(
    @InjectModel(ModeratorViewEntity.name)
    readonly moderatorViewModel: Model<ModeratorViewEntity>,
    readonly questionService: QuestionService
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
}
