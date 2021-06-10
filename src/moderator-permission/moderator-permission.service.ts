import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ModeratorPermissionEntity } from "./entities/moderator-permission.entity";

@Injectable()
export class ModeratorPermissionService {
  constructor(
    @InjectModel(ModeratorPermissionEntity.name)
    private readonly permissionModel: Model<ModeratorPermissionEntity>
  ) {}
}
