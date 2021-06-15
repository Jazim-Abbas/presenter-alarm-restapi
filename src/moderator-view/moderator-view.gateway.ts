import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { ModeratorViewService } from "./moderator-view.service";

@WebSocketGateway()
export class ModeratorViewGateway {
  constructor(private readonly moderatorViewService: ModeratorViewService) {}

  @SubscribeMessage("create-moderator-view-question")
  handleMessage() {
    return "create question for moderator view!";
  }
}
