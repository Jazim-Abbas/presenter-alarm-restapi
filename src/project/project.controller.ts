import { Body, Controller, Param, Patch, Post } from "@nestjs/common";
import { FindOneParam } from "src/common/dtos/find-one-param.dto";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { UpdateProjectDto } from "./dtos/update-project.dto";
import { ProjectService } from "./project.service";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.saveProject(createProjectDto);
  }

  @Patch(":id")
  async update(
    @Param() params: FindOneParam,
    @Body() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectService.updateProject(params.id, updateProjectDto);
  }
}
