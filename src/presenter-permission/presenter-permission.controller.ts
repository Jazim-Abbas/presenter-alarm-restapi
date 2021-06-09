import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePresenterPermissionDto } from "./dtos/create-permission.dto";
import { PresenterPermissionService } from "./presenter-permission.service";

@ApiTags("presenter-permission")
@Controller("presenter-permission")
export class PresenterPermissionController {
  constructor(private readonly permissionService: PresenterPermissionService) {}

  @Post()
  async createPermission(
    @Body() createPermissionDto: CreatePresenterPermissionDto
  ) {
    return this.permissionService.createPermission(createPermissionDto);
    return createPermissionDto;
    return "create presenter permission";
  }
}
