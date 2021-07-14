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
import { PresenterViewService } from "src/presenter-view/presenter-view.service";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { ModeratorViewService } from "./moderator-view.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class ModeratorViewGateway {
  @WebSocketServer() server: Server;

  constructor(
    private readonly moderatorViewService: ModeratorViewService,
    private readonly presenterService: PresenterViewService
  ) {}

  @SubscribeMessage("all-moderator-questions")
  findAll() {
    return this.moderatorViewService.getAllQuestions();
  }

  @WsValidationPipe()
  @SubscribeMessage("create-moderator-question")
  async createQuestion(@MessageBody() createQuestionDto: CreateQuestionDto) {
    const questionInDb = await this.moderatorViewService.saveModeratorQuestion(
      createQuestionDto
    );

    this.server.emit("new-moderator-question", questionInDb);
    return { messasge: "Question saved now" };
  }

  @WsValidationPipe()
  @SubscribeMessage("delete-moderator-question")
  async deleteQuestion(
    @MessageBody() deleteQuestionIdDto: DeleteQuestionIdDto
  ) {
    await this.moderatorViewService.deleteModeratorQuestion(
      deleteQuestionIdDto
    );
    await this._updatedQuestions();
    return { message: "Successfully delete question from moderator view" };
  }

  @WsValidationPipe()
  @SubscribeMessage("move-moderator-question-to-presenter")
  async moveQuestionToLve(@MessageBody() moveQuestionDto: MoveQuestionDto) {
    await this.moderatorViewService.moveQuestionToLiveQuestion(moveQuestionDto);
    await this._updatedQuestions();
    await this._updatePresenterQuestions();
    return { message: "Successfully move question to presenter" };
  }

  private async _updatedQuestions() {
    this.server.emit(
      "updated-moderator-questions",
      await this.moderatorViewService.getAllQuestions()
    );
  }

  private async _updatePresenterQuestions() {
    this.server.emit(
      "updated-presenter-questions",
      await this.presenterService.getAllQuestions()
    );
  }
}
