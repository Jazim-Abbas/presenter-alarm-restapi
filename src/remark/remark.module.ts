import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Remark, RemarkEntity } from "./entities/remark.entity";
import { RemarkGateway } from "./remark.gateway";
import { RemarkService } from './remark.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RemarkEntity.name, schema: Remark }]),
  ],
  providers: [RemarkGateway, RemarkService],
})
export class RemarkModule {}
