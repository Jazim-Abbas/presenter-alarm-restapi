import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PresenterPermissionEntity } from "./entities/presenter-permission.entity";

@Injectable()
export class PresenterPermissionService {
  constructor(
    @InjectModel(PresenterPermissionEntity.name)
    private readonly permissionModel: Model<PresenterPermissionEntity>
  ) {}

  
}
