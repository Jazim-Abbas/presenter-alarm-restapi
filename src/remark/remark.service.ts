import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateRemarkDto } from "./dtos/create-remark.dto";
import { RemarkEntity } from "./entities/remark.entity";

@Injectable()
export class RemarkService {
  constructor(
    @InjectModel(RemarkEntity.name)
    private readonly remarkModel: Model<RemarkEntity>
  ) {}

  async saveRemark(createRemarkDto: CreateRemarkDto) {
    const { description, projectId } = createRemarkDto;

    const remark = new this.remarkModel({ description, project: projectId });
    return await remark.save();
  }
}
