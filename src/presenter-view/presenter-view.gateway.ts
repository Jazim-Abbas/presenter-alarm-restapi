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
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { PresenterViewService } from "./presenter-view.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class PresenterViewGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly presenterViewService: PresenterViewService) {}

  @SubscribeMessage("all-presenter-questions")
  findAll() {
    return this.presenterViewService.getAllQuestions();
  }

  @WsValidationPipe()
  @SubscribeMessage("create-presenter-question")
  async createQuestion(@MessageBody() createQuestionDto: CreateQuestionDto) {
    const questionInDb = await this.presenterViewService.savePresenterQuestion(
      createQuestionDto
    );

    this.server.emit("new-presenter-question", questionInDb);
    return { message: "Question saved now" };
  }

  @WsValidationPipe()
  @SubscribeMessage("delete-presenter-question")
  async deleteQuestion(@MessageBody() deleteQuestionDto: DeleteQuestionIdDto) {
    await this.presenterViewService.deletePresenterQuestion(deleteQuestionDto);
    return { message: "Successfully delete question from presenter view" };
  }

  @WsValidationPipe()
  @SubscribeMessage("move-presenter-question-to-archived")
  async moveQuestionToArchived(
    @MessageBody() moveQuestionDto: MoveQuestionDto
  ) {
    await this.presenterViewService.moveQuestionToArchived(moveQuestionDto);
    return { message: "Successfully move question to archived" };
  }
}
