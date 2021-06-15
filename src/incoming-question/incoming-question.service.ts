import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { QuestionService } from "src/question/question.service";
import { CreateIncomingQuestionDto } from "./dtos/create-incoming-question.dto";
import { IncomingQuestionEntity } from "./entities/incoming-question.entity";

@Injectable()
export class IncomingQuestionService {
  constructor(
    @InjectModel(IncomingQuestionEntity.name)
    private readonly incomingQuestionModel: Model<IncomingQuestionEntity>,
    private readonly questionService: QuestionService
  ) {}

  async saveIncomingQuestion(
    createIncomingQuestionDto: CreateIncomingQuestionDto
  ) {
    const { ...questionDto } = createIncomingQuestionDto;
    const question = await this._saveAndGetNewlyCreatedQuestion(questionDto);

    const incomingQuestionInDb = await this._saveIncomingQuestion({
      projectId: questionDto.project,
      questionId: question._id,
    });

    return incomingQuestionInDb;
  }

  private async _saveAndGetNewlyCreatedQuestion(
    createQuestionDto: CreateQuestionDto
  ) {
    return await this.questionService.saveQuestion({
      ...createQuestionDto,
    });
  }

  private async _saveIncomingQuestion(incomingQuestion: {
    projectId: string;
    questionId: string;
  }) {
    const { projectId, questionId } = incomingQuestion;

    return await this.incomingQuestionModel.findOneAndUpdate(
      {
        project: projectId,
      },
      { $push: { questions: questionId } },
      { new: true, upsert: true }
    );
  }
}
