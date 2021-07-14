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
import { ModeratorViewService } from "src/moderator-view/moderator-view.service";
import { PresenterViewService } from "src/presenter-view/presenter-view.service";
import { CreateIncomingQuestionDto } from "./dtos/create-incoming-question.dto";
import { DeleteIncomingQuestionDto } from "./dtos/delete-incoming-question.dto";
import { IncomingQuestionService } from "./incoming-question.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class IncomingQuestionGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly incomingQuestionService: IncomingQuestionService,
    private readonly moderatorService: ModeratorViewService,
    private readonly presenterService: PresenterViewService
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
    await this._updatedQuestions();
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
    await this._updatedQuestions();
    await this._updateModeratorQuestion();
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
    await this._updatedQuestions();
    await this._updatePresenterQuestion();
    return { message: "Successfully move incoming question to presenter view" };
  }

  private async _updatedQuestions() {
    this.server.emit(
      "updated-incoming-questions",
      await this.incomingQuestionService.getAllQuestions()
    );
  }

  private async _updateModeratorQuestion() {
    this.server.emit(
      "updated-moderator-questions",
      await this.moderatorService.getAllQuestions()
    );
  }

  private async _updatePresenterQuestion() {
    this.server.emit(
      "updated-presenter-questions",
      await this.presenterService.getAllQuestions()
    );
  }
}
