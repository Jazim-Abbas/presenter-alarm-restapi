import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserRole } from "src/auth/interfaces/user-role.interface";
import { Roles, RolesGuardAuth } from "src/common/decorators/roles.decorator";
import { ModeratorPermissionDto } from "./dtos/moderator-permission.dto";
import { ModeratorPermissionService } from "./moderator-permission.service";

@ApiTags("moderator-permission")
@Controller("moderator-permission")
export class ModeratorPermissionController {
  constructor(private readonly permissionService: ModeratorPermissionService) {}

  @Get()
  async getPermission() {
    return this.permissionService.getPermission();
  }

  @RolesGuardAuth()
  @Roles(UserRole.SUPER_USER)
  @Post()
  async createOrUpdatePermission(@Body() permssionDto: ModeratorPermissionDto) {
    return this.permissionService.createOrUpdatePermission(permssionDto);
  }
}
