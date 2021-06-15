import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { QuestionService } from "src/question/question.service";
import { CreateIncomingQuestionDto } from "./dtos/create-incoming-question.dto";
import { DeleteIncomingQuestionDto } from "./dtos/delete-incoming-question.dto";
import { IncomingQuestionEntity } from "./entities/incoming-question.entity";

@Injectable()
export class IncomingQuestionService {
  constructor(
    @InjectModel(IncomingQuestionEntity.name)
    private readonly incomingQuestionModel: Model<IncomingQuestionEntity>,
    private readonly questionService: QuestionService
  ) {}

  async getAllIncomingQuestions() {
    return this.incomingQuestionModel
      .find()
      .populate("project")
      .populate("questions")
      .exec();
  }

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

  async deleteIncomingQuestion(
    deleteIncomingQuestionDto: DeleteIncomingQuestionDto
  ) {
    const updatedIncomingQuestion =
      await this._removeQuestionIdFromIncomingQuestons(
        deleteIncomingQuestionDto
      );

    if (!updatedIncomingQuestion)
      throw new NotFoundException("Project or question not found");
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

  private async _removeQuestionIdFromIncomingQuestons(
    deleteIncomingQuestionDto: DeleteIncomingQuestionDto
  ) {
    const { projectId, questionId } = deleteIncomingQuestionDto;

    return this.incomingQuestionModel
      .findOneAndUpdate(
        { project: projectId },
        { $pull: { questions: { $in: [questionId] } } }
      )
      .exec();
  }
}
