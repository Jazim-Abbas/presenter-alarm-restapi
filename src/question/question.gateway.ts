import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from "@nestjs/websockets";

@WebSocketGateway()
export class QuestionGateway {
  @SubscribeMessage("messageToServer")
  handle(): string {
    return "Hello";
    // return { event: "messageToClient", data: "Hello" };
  }
}
