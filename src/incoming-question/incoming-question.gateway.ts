import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { CreateIncomingQuestionDto } from "./dtos/create-incoming-question.dto";

@WSExceptionInterceptor()
@WebSocketGateway()
export class IncomingQuestionGateway {
  @SubscribeMessage("incoming-question")
  handleMessage() {
    return "Incoming Question!";
  }

  @WsValidationPipe()
  @SubscribeMessage("create-incoming-question")
  async createIncomingQuestion(
    @MessageBody() createIncomingQuestionDto: CreateIncomingQuestionDto
  ) {
    return createIncomingQuestionDto;
  }
}
