import { Body, Controller, Post } from "@nestjs/common";
import { CreateProjectDto } from "./dtos/create-project.dto";
import { ProjectService } from "./project.service";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.saveProject(createProjectDto);
  }
}
