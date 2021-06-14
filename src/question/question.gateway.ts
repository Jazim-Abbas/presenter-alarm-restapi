import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from "@nestjs/websockets";

@WebSocketGateway()
export class QuestionGateway {
  @SubscribeMessage("messageToServer")
  handle(): WsResponse<any> {
    return { event: "messageToClient", data: "Hello" };
  }
}
