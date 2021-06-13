import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { UpdateProjectDto } from "./dtos/update-project.dto";
import { ProjectEntity } from "./entities/project.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(ProjectEntity.name)
    private readonly projectModel: Model<ProjectEntity>
  ) {}

  async getSingleProject(id: string) {
    const projectInDb = await this.projectModel.findById(id).exec();
    if (!projectInDb) throw new NotFoundException("Project not found");
    return projectInDb;
  }

  async saveProject(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel({ ...createProjectDto });
    return await project.save();
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    const updatedProject = await this.projectModel.findByIdAndUpdate(
      id,
      { ...updateProjectDto },
      { new: true }
    );
    if (!updatedProject) throw new NotFoundException("Project not found");
    return updatedProject;
  }

  async deleteProject(id: string) {
    const project = await this.projectModel.findByIdAndDelete(id);
    if (!project || !project.$isDeleted)
      throw new NotFoundException("Project not found");
  }
}
