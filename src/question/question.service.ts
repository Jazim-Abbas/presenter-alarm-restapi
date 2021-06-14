import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { WsException } from "@nestjs/websockets";
import { Model } from "mongoose";
import { ProjectService } from "src/project/project.service";
import { CreateQuestionDto } from "./dtos/create-question.dto";
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

  private async _throwErrorIfProjectNotExists(projectId: string) {
    try {
      await this.projectService.getSingleProject(projectId);
    } catch (err) {
      throw new WsException(err);
    }
  }
}
