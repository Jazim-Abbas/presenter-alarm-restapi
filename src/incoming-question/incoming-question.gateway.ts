import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { MoveQuestionDto } from "src/common/dtos/move-question.dto";
import { CreateIncomingQuestionDto } from "./dtos/create-incoming-question.dto";
import { DeleteIncomingQuestionDto } from "./dtos/delete-incoming-question.dto";
import { IncomingQuestionService } from "./incoming-question.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class IncomingQuestionGateway {
  constructor(
    private readonly incomingQuestionService: IncomingQuestionService
  ) {}

  @SubscribeMessage("incoming-question")
  handleMessage() {
    return "Incoming Question!";
  }

  @SubscribeMessage("all-incoming-questions")
  getAllIncomingQuestions() {
    return this.incomingQuestionService.getAllQuestions();
  }

  @WsValidationPipe()
  @SubscribeMessage("create-incoming-question")
  async createIncomingQuestion(
    @MessageBody() createIncomingQuestionDto: CreateIncomingQuestionDto
  ) {
    return this.incomingQuestionService.saveIncomingQuestion(
      createIncomingQuestionDto
    );
  }

  @WsValidationPipe()
  @SubscribeMessage("delete-incoming-question")
  async deleteIncomingQuestion(
    @MessageBody() deleteIncomingQuestionDto: DeleteIncomingQuestionDto
  ) {
    await this.incomingQuestionService.deleteIncomingQuestion(
      deleteIncomingQuestionDto
    );
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
    return { message: "Successfully move incoming question to moderator view" };
    return moveQuestionDto;
    return "move question";
  }
}
