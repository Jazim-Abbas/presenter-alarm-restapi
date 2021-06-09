import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePresenterPermissionDto } from "./dtos/create-permission.dto";
import { PresenterPermissionService } from "./presenter-permission.service";

@ApiTags("presenter-permission")
@Controller("presenter-permission")
export class PresenterPermissionController {
  constructor(private readonly permissionService: PresenterPermissionService) {}

  @Get()
  async getPermission() {
    return this.permissionService.getPermission();
    return "getting permission";
  }

  @Post()
  async createPermission(
    @Body() createPermissionDto: CreatePresenterPermissionDto
  ) {
    return this.permissionService.createOrUpdatePermission(createPermissionDto);
  }
}
