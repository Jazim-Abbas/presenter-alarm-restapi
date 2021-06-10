import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ModeratorPermissionDto } from "./dtos/moderator-permission.dto";
import { ModeratorPermissionEntity } from "./entities/moderator-permission.entity";

@Injectable()
export class ModeratorPermissionService {
  constructor(
    @InjectModel(ModeratorPermissionEntity.name)
    private readonly permissionModel: Model<ModeratorPermissionEntity>
  ) {}

  async createOrUpdatePermission(permssionDto: ModeratorPermissionDto) {
    return this.permissionModel
      .findOneAndUpdate({}, { ...permssionDto }, { new: true, upsert: true })
      .exec();
  }
}
