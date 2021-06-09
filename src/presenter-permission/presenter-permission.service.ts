import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePresenterPermissionDto } from "./dtos/create-permission.dto";
import { PresenterPermissionEntity } from "./entities/presenter-permission.entity";

@Injectable()
export class PresenterPermissionService {
  constructor(
    @InjectModel(PresenterPermissionEntity.name)
    private readonly permissionModel: Model<PresenterPermissionEntity>
  ) {}

  async getPermission() {
    return this.permissionModel.findOne({}).exec();
  }

  async createOrUpdatePermission(
    createPermissionDto: CreatePresenterPermissionDto
  ) {
    return this.permissionModel
      .findOneAndUpdate(
        {},
        { ...createPermissionDto },
        { new: true, upsert: true }
      )
      .exec();
  }
}
