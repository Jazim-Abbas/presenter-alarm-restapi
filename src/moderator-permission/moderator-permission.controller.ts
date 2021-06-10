import { Controller, Post } from "@nestjs/common";

@Controller("moderator-permission")
export class ModeratorPermissionController {
  @Post()
  async createOrUpdatePermission() {
    return "create or update permission";
  }
}
