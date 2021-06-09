import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreatePresenterPermissionDto } from "./dtos/create-permission.dto";

@ApiTags("presenter-permission")
@Controller("presenter-permission")
export class PresenterPermissionController {
  @Post()
  async createPermission(
    @Body() createPermissionDto: CreatePresenterPermissionDto
  ) {
    return createPermissionDto;
    return "create presenter permission";
  }
}
