import { NotFoundException } from "@nestjs/common";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { IncomingQuestionEntity } from "src/incoming-question/entities/incoming-question.entity";
import { ModeratorViewEntity } from "src/moderator-view/entities/moderator-view.entity";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { QuestionService } from "src/question/question.service";
import { DeleteQuestionIdDto } from "../dtos/delete-question-id.dto";
import { MoveQuestionDto } from "../dtos/move-question.dto";

export class GeneralQuestionService<
  T extends IncomingQuestionEntity | ModeratorViewEntity
> {
  constructor(
    protected readonly questionModel: Model<T>,
    protected readonly questionService: QuestionService
  ) {}

  protected async getAll() {
    return this.questionModel
      .find()
      .populate("project")
      .populate("questions")
      .exec();
  }

  async moveQuestion(moveQuestionDto: MoveQuestionDto) {
    return this._saveQuestionForModeratorOrPresenterOrIncomingQuestion(
      moveQuestionDto
    );
  }

  protected async saveQuestionForSections(
    createQuestionDto: CreateQuestionDto
  ) {
    const questionInDb = await this._saveAndGetNewlyCreatedQuestion(
      createQuestionDto
    );

    const questionPayload: MoveQuestionDto = {
      projectId: createQuestionDto.project,
      questionId: questionInDb._id,
    };

    await this._saveQuestionForModeratorOrPresenterOrIncomingQuestion(
      questionPayload
    );

    return questionInDb;
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
    questionPayload: MoveQuestionDto
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
