import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { DeleteQuestionIdDto } from "src/common/dtos/delete-question-id.dto";
import { LiveQuestionService } from "./live-question.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class LiveQuestionGateway {
  constructor(private readonly liveQuestionService: LiveQuestionService) {}

  @SubscribeMessage("message")
  handleMessage() {
    return "Hello world!";
  }

  @WsValidationPipe()
  @SubscribeMessage("delete-live-question")
  async saveLiveQuestion(
    @MessageBody() deleteQuestionDto: DeleteQuestionIdDto
  ) {
    await this.liveQuestionService.deleteQuestion(deleteQuestionDto);
    return { message: "Successfully delete question from live questions " };
  }
}
