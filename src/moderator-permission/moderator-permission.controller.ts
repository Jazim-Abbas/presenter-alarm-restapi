import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ModeratorPermissionDto } from "./dtos/moderator-permission.dto";
import { ModeratorPermissionService } from "./moderator-permission.service";

@ApiTags("moderator-permission")
@Controller("moderator-permission")
export class ModeratorPermissionController {
  constructor(private readonly permissionService: ModeratorPermissionService) {}

  @Post()
  async createOrUpdatePermission(@Body() permssionDto: ModeratorPermissionDto) {
    return this.permissionService.createOrUpdatePermission(permssionDto);
    return permssionDto;
    return "create or update permission";
  }
}
