import { Controller, Post } from "@nestjs/common";
import { ProjectService } from "./project.service";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create() {
    return "create project";
  }
}
