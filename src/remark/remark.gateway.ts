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
  async updateRemark(@MessageBody() updateRemarkDto: UpdateRemarkDto) {
    const updatedRemark = await this.remarkService.updateRemark(
      updateRemarkDto
    );
    await this._updatedRemarks();
    return updatedRemark;
  }

  @WsValidationPipe()
  @SubscribeMessage("delete-remark")
  async deleteRemark(@MessageBody() deleteRemarkDto: FindOneParam) {
    await this.remarkService.deleteRemark(deleteRemarkDto.id);
    await this._updatedRemarks();
    return { message: "Successfully delete remark" };
  }

  private async _updatedRemarks() {
    this.server.emit(
      "updated-remarks",
      await this.remarkService.getAllRemarks()
    );
  }
}
