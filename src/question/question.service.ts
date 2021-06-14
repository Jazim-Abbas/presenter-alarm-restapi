import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProjectService } from "src/project/project.service";
import { CreateQuestionDto } from "./dtos/create-question.dto";
import { UpdateQuestionDto } from "./dtos/update-question.dto";
import { QuestionEntity } from "./entities/question.entity";

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(QuestionEntity.name)
    private readonly questionModel: Model<QuestionEntity>,
    private readonly projectService: ProjectService
  ) {}

  async saveQuestion(createQuestionDto: CreateQuestionDto) {
    await this._throwErrorIfProjectNotExists(createQuestionDto.project);
    const question = new this.questionModel({ ...createQuestionDto });
    return await question.save();
  }

  async updateQuestion(updateQuestionDto: UpdateQuestionDto) {
    const { id, ...questionDto } = updateQuestionDto;

    const questionInDb = await this.questionModel.findByIdAndUpdate(
      id,
      { ...questionDto },
      { new: true }
    );
    if (!questionInDb) throw new NotFoundException("Question is not found");
    return questionInDb;
  }

  private async _throwErrorIfProjectNotExists(projectId: string) {
    await this.projectService.getSingleProject(projectId);
  }
}
