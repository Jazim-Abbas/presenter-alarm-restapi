import {
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from "@nestjs/websockets";
import { QuestionService } from "./question.service";

@WebSocketGateway()
export class QuestionGateway {
  constructor(private readonly questionService: QuestionService) {}

  @SubscribeMessage("messageToServer")
  handle(): string {
    return "Hello";
    // return { event: "messageToClient", data: "Hello" };
  }
}
