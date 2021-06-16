import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RemarkEntity } from "./entities/remark.entity";

@Injectable()
export class RemarkService {
  constructor(
    @InjectModel(RemarkEntity.name)
    private readonly remarkModel: Model<RemarkEntity>
  ) {}
}
