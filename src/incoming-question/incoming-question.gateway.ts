import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()
export class IncomingQuestionGateway {
  @SubscribeMessage("incoming-question")
  handleMessage() {
    return "Incoming Question!";
  }
}
