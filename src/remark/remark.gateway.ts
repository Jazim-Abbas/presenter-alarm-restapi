import { UseGuards } from "@nestjs/common";
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
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
  @WebSocketServer() server: Server;

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
    await this._updatedQuestions();
    return { message: "Successfully delete remark" };
  }

  private async _updatedQuestions() {
    this.server.emit(
      "updated-remarks",
      await this.remarkService.getAllRemarks()
    );
  }
}
