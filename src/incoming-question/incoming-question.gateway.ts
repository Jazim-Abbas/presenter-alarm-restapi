import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { MoveQuestionDto } from "src/common/dtos/move-question.dto";
import { CreateIncomingQuestionDto } from "./dtos/create-incoming-question.dto";
import { DeleteIncomingQuestionDto } from "./dtos/delete-incoming-question.dto";
import { IncomingQuestionService } from "./incoming-question.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class IncomingQuestionGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly incomingQuestionService: IncomingQuestionService
  ) {}

  @SubscribeMessage("all-incoming-questions")
  getAllIncomingQuestions() {
    return this.incomingQuestionService.getAllQuestions();
  }

  @WsValidationPipe()
  @SubscribeMessage("create-incoming-question")
  async createIncomingQuestion(
    @MessageBody() createIncomingQuestionDto: CreateIncomingQuestionDto
  ) {
    const questionInDb =
      await this.incomingQuestionService.saveIncomingQuestion(
        createIncomingQuestionDto
      );

    this.server.emit("new-incoming-question", questionInDb);
    return { message: "Question saved" };
  }

  @WsValidationPipe()
  @SubscribeMessage("delete-incoming-question")
  async deleteIncomingQuestion(
    @MessageBody() deleteIncomingQuestionDto: DeleteIncomingQuestionDto
  ) {
    await this.incomingQuestionService.deleteIncomingQuestion(
      deleteIncomingQuestionDto
    );
    this._updatedQuestions();
    return { message: "Successfully deleted question from incoming question" };
  }

  @WsValidationPipe()
  @SubscribeMessage("move-incoming-question-to-moderator")
  async moveQuestionToModeratorView(
    @MessageBody() moveQuestionDto: MoveQuestionDto
  ) {
    await this.incomingQuestionService.moveQuestionToModeratorView(
      moveQuestionDto
    );
    this._updatedQuestions();
    return { message: "Successfully move incoming question to moderator view" };
  }

  @WsValidationPipe()
  @SubscribeMessage("move-incoming-question-to-presenter")
  async moveQuestionToPresenterView(
    @MessageBody() moveQuestionDto: MoveQuestionDto
  ) {
    await this.incomingQuestionService.moveQuestionToPresenterView(
      moveQuestionDto
    );
    this._updatedQuestions();
    return { message: "Successfully move incoming question to presenter view" };
  }

  private async _updatedQuestions() {
    this.server.emit(
      "updated-questions",
      await this.incomingQuestionService.getAllQuestions()
    );
  }
}
