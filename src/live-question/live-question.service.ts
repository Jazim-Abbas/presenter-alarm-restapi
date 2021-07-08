import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ArchiveQuestionService } from "src/archive-question/archive-question.service";
import { MoveQuestionDto } from "src/common/dtos/move-question.dto";
import { GeneralQuestionService } from "src/common/services/general-question.service";
import { QuestionService } from "src/question/question.service";
import { LiveQuestionEntity } from "./entity/live-question.entity";

@Injectable()
export class LiveQuestionService extends GeneralQuestionService<LiveQuestionEntity> {
  constructor(
    @InjectModel(LiveQuestionEntity.name)
    protected readonly liveQuestionModel: Model<LiveQuestionEntity>,
    protected readonly questionService: QuestionService,
    private readonly archivedQuestionService: ArchiveQuestionService
  ) {
    super(liveQuestionModel, questionService);
  }

  async getAllQusetions() {
    return this.getAll();
  }

  async deleteQuestion(moveQuestionDto: MoveQuestionDto) {
    return this.deleteQuestionFromSection(moveQuestionDto);
  }

  async moveQuestionToArchived(moveQuestionDto: MoveQuestionDto) {
    await this.archivedQuestionService.moveQuestion(moveQuestionDto);
    await this.deleteQuestion(moveQuestionDto);
  }
}
