import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ModeratorViewEntity } from "./entities/moderator-view.entity";

@Injectable()
export class ModeratorViewService {
  constructor(
    @InjectModel(ModeratorViewEntity.name)
    private readonly moderatorViewModel: Model<ModeratorViewEntity>
  ) {}
}
