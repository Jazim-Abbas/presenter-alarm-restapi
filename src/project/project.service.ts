import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { ProjectEntity } from "./entities/project.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(ProjectEntity.name)
    private readonly projectModel: Model<ProjectEntity>
  ) {}

  async saveProject(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel({ ...createProjectDto });
    return await project.save();
  }
}
