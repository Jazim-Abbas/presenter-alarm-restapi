import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { DeleteQuestionIdDto } from "src/common/dtos/delete-question-id.dto";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { ModeratorViewService } from "./moderator-view.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class ModeratorViewGateway {
  constructor(private readonly moderatorViewService: ModeratorViewService) {}

  @SubscribeMessage("all-moderator-questions")
  findAll() {
    return this.moderatorViewService.getAllQuestions();
  }

  @WsValidationPipe()
  @SubscribeMessage("create-moderator-question")
  createQuestion(@MessageBody() createQuestionDto: CreateQuestionDto) {
    return this.moderatorViewService.saveModeratorQuestion(createQuestionDto);
  }

  @WsValidationPipe()
  @SubscribeMessage("delete-moderator-question")
  async deleteQuestion(
    @MessageBody() deleteQuestionIdDto: DeleteQuestionIdDto
  ) {
    await this.moderatorViewService.deleteModeratorQuestion(
      deleteQuestionIdDto
    );
    return { message: "Successfully delete question from moderator view" };
  }
}
