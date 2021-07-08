import { UseGuards } from "@nestjs/common";
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { FindOneParam } from "src/common/dtos/find-one-param.dto";
import { WSJwtAuthGuard } from "src/common/guards/ws-jwt-auth.guard";
import { CreateRemarkDto } from "./dtos/create-remark.dto";
import { UpdateRemarkDto } from "./dtos/update-remark.dto";
import { RemarkService } from "./remark.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class RemarkGateway {
  constructor(private readonly remarkService: RemarkService) {}

  @UseGuards(WSJwtAuthGuard)
  @SubscribeMessage("all-remarks")
  findAll() {
    return this.remarkService.getAllRemarks();
  }

  @WsValidationPipe()
  @SubscribeMessage("create-remark")
  createRemark(@MessageBody() createRemarkDto: CreateRemarkDto) {
    return this.remarkService.saveRemark(createRemarkDto);
  }

  @WsValidationPipe()
  @SubscribeMessage("update-remark")
  updateRemark(@MessageBody() updateRemarkDto: UpdateRemarkDto) {
    return this.remarkService.updateRemark(updateRemarkDto);
  }

  @WsValidationPipe()
  @SubscribeMessage("delete-remark")
  async deleteRemark(@MessageBody() deleteRemarkDto: FindOneParam) {
    await this.remarkService.deleteRemark(deleteRemarkDto.id);
    return { message: "Successfully delete remark" };
  }
}
