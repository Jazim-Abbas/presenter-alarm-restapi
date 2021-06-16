import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { LiveQuestionService } from "./live-question.service";

@WebSocketGateway()
export class LiveQuestionGateway {
  constructor(private readonly liveQuestionService: LiveQuestionService) {}

  @SubscribeMessage("message")
  handleMessage(client: any, payload: any): string {
    return "Hello world!";
  }
}
