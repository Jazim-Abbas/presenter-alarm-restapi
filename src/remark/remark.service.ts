import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateRemarkDto } from "./dtos/create-remark.dto";
import { UpdateRemarkDto } from "./dtos/update-remark.dto";
import { RemarkEntity } from "./entities/remark.entity";

@Injectable()
export class RemarkService {
  constructor(
    @InjectModel(RemarkEntity.name)
    private readonly remarkModel: Model<RemarkEntity>
  ) {}

  async getAllRemarks() {
    return this.remarkModel.find().exec();
  }

  async saveRemark(createRemarkDto: CreateRemarkDto) {
    const { description, projectId } = createRemarkDto;
    const remark = new this.remarkModel({ description, project: projectId });
    return await remark.save();
  }

  async updateRemark(updateRemarkDto: UpdateRemarkDto) {
    const { remarkId } = updateRemarkDto;
    const remarkInDb = await this.remarkModel.findByIdAndUpdate(
      remarkId,
      { $set: { ...updateRemarkDto } },
      { new: true }
    );
    if (!remarkInDb) throw new NotFoundException("Remark is not found");
    return remarkInDb;
  }

  async deleteRemark(id: string) {
    const deletedRemark = await this.remarkModel.findByIdAndDelete(id);
    if (!deletedRemark || !deletedRemark.$isDeleted)
      throw new NotFoundException("Remark not found");
  }
}
