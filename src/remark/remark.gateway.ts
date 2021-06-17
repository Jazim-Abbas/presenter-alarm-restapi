import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { CreateRemarkDto } from "./dtos/create-remark.dto";
import { UpdateRemarkDto } from "./dtos/update-remark.dto";
import { RemarkService } from "./remark.service";

@WSExceptionInterceptor()
@WebSocketGateway({ namespace: "remarks" })
export class RemarkGateway {
  constructor(private readonly remarkService: RemarkService) {}

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
}
