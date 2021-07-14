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
import { ArchiveQuestionService } from "./archive-question.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class ArchiveQuestionGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly archivedQuestionService: ArchiveQuestionService
  ) {}

  @SubscribeMessage("all-archived-questions")
  getAllIncomingQuestions() {
    return this.archivedQuestionService.getAllQuestions();
  }

  @WsValidationPipe()
  @SubscribeMessage("delete-archived-question")
  async deleteQuestion(@MessageBody() deleteQuestionDto: DeleteQuestionIdDto) {
    await this.archivedQuestionService.deleteQuestion(deleteQuestionDto);
    await this._updatedQuestions();
    return { message: "Successfully delete question from archived" };
  }

  @WsValidationPipe()
  @SubscribeMessage("move-archived-to-presenter-question")
  async moveQuestionToArchived(
    @MessageBody() moveQuestionDto: MoveQuestionDto
  ) {
    // await this.presenterViewService.moveQuestionToArchived(moveQuestionDto);
    // await this._updatedQuestions();
    // await this._updatedArchivedQuestion();
    return { message: "Successfully move question to archived" };
  }

  private async _updatedQuestions() {
    this.server.emit(
      "updated-archived-questions",
      await this.archivedQuestionService.getAllQuestions()
    );
  }
}
