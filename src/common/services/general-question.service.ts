import { NotFoundException } from "@nestjs/common";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { IncomingQuestionEntity } from "src/incoming-question/entities/incoming-question.entity";
import { ModeratorViewEntity } from "src/moderator-view/entities/moderator-view.entity";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { QuestionService } from "src/question/question.service";
import { DeleteQuestionIdDto } from "../dtos/delete-question-id.dto";

interface QuestionSectionPayload {
  projectId: string;
  questionId: string;
}

export class GeneralQuestionService<
  T extends IncomingQuestionEntity | ModeratorViewEntity
> {
  constructor(
    private readonly questionModel: Model<T>,
    readonly questionService: QuestionService
  ) {}

  protected async getAll() {
    return this.questionModel
      .find()
      .populate("project")
      .populate("questions")
      .exec();
  }

  protected async saveQuestionForSections(
    createQuestionDto: CreateQuestionDto
  ) {
    const questionInDb = await this._saveAndGetNewlyCreatedQuestion(
      createQuestionDto
    );

    const questionPayload: QuestionSectionPayload = {
      projectId: createQuestionDto.project,
      questionId: questionInDb._id,
    };

    return this._saveQuestionForModeratorOrPresenterOrIncomingQuestion(
      questionPayload
    );
  }

  protected async deleteQuestionFromSection(
    deleteQuestionIdDto: DeleteQuestionIdDto
  ) {
    const updatedQuestion = await this._removeQuestionIdFromSection(
      deleteQuestionIdDto
    );

    if (!updatedQuestion)
      throw new NotFoundException("Project or question not found");
  }

  private async _saveAndGetNewlyCreatedQuestion(
    createQuestionDto: CreateQuestionDto
  ) {
    return await this.questionService.saveQuestion({
      ...createQuestionDto,
    });
  }

  private async _saveQuestionForModeratorOrPresenterOrIncomingQuestion(
    questionPayload: QuestionSectionPayload
  ) {
    const { projectId, questionId } = questionPayload;

    return await this.questionModel
      .findOneAndUpdate(
        { project: projectId } as FilterQuery<T>,
        { $push: { questions: questionId } } as UpdateQuery<T>,
        { new: true, upsert: true }
      )
      .exec();
  }

  private async _removeQuestionIdFromSection(
    deleteQuestionIdDto: DeleteQuestionIdDto
  ) {
    const { questionId, projectId } = deleteQuestionIdDto;

    return await this.questionModel
      .findOneAndUpdate(
        { project: projectId } as FilterQuery<T>,
        { $pull: { questions: { $in: [questionId] } } } as UpdateQuery<T>
      )
      .exec();
  }
}
