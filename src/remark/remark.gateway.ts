import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { CreateRemarkDto } from "./dtos/create-remark.dto";
import { RemarkService } from "./remark.service";

@WSExceptionInterceptor()
@WebSocketGateway({ namespace: "remarks" })
export class RemarkGateway {
  constructor(private readonly remarkService: RemarkService) {}

  @WsValidationPipe()
  @SubscribeMessage("create-remark")
  handleMessage(@MessageBody() createRemarkDto: CreateRemarkDto) {
    return this.remarkService.saveRemark(createRemarkDto);
  }
}
