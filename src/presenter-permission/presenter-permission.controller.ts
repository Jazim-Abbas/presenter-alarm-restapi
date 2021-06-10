import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserRole } from "src/auth/interfaces/user-role.interface";
import { Roles, RolesGuardAuth } from "src/common/decorators/roles.decorator";
import { PresenterPermissionDto } from "./dtos/create-permission.dto";
import { PresenterPermissionService } from "./presenter-permission.service";

@ApiTags("presenter-permission")
@Controller("presenter-permission")
export class PresenterPermissionController {
  constructor(private readonly permissionService: PresenterPermissionService) {}

  @Get()
  async getPermission() {
    return this.permissionService.getPermission();
  }

  @RolesGuardAuth()
  @Roles(UserRole.SUPER_USER)
  @Post()
  async createPermission(@Body() createPermissionDto: PresenterPermissionDto) {
    return this.permissionService.createOrUpdatePermission(createPermissionDto);
  }
}
