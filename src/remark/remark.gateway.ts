import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { RemarkService } from "./remark.service";

@WebSocketGateway({ namespace: "remarks" })
export class RemarkGateway {
  constructor(private readonly remarkService: RemarkService) {}

  @SubscribeMessage("create-remark")
  handleMessage() {
    return "Create new remark!";
  }
}
