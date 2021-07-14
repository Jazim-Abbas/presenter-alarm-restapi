import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { DeleteQuestionIdDto } from "src/common/dtos/delete-question-id.dto";
import { MoveQuestionDto } from "src/common/dtos/move-question.dto";
import { LiveQuestionService } from "./live-question.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class LiveQuestionGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly liveQuestionService: LiveQuestionService) {}

  @SubscribeMessage("message")
  handleMessage() {
    return "Hello world!";
  }

  @SubscribeMessage("all-live-questions")
  findAll() {
    return this.liveQuestionService.getAllQusetions();
  }

  @WsValidationPipe()
  @SubscribeMessage("delete-live-question")
  async saveLiveQuestion(
    @MessageBody() deleteQuestionDto: DeleteQuestionIdDto
  ) {
    await this.liveQuestionService.deleteQuestion(deleteQuestionDto);
    await this._updatedQuestions();
    return { message: "Successfully delete question from live questions " };
  }

  @WsValidationPipe()
  @SubscribeMessage("move-live-question-to-archived")
  async moveQuestionToArchived(@MessageBody() moveQuetionDto: MoveQuestionDto) {
    await this.liveQuestionService.moveQuestionToArchived(moveQuetionDto);
    await this._updatedQuestions();
    return { message: "Successfully move question to archived" };
  }

  private async _updatedQuestions() {
    this.server.emit(
      "updated-live-questions",
      await this.liveQuestionService.getAllQusetions()
    );
  }
}
