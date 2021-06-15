import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()
export class ModeratorViewGateway {
  @SubscribeMessage("create-moderator-view-question")
  handleMessage() {
    return "create question for moderator view!";
  }
}
