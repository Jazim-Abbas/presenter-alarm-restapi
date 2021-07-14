import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { DeleteQuestionIdDto } from "src/common/dtos/delete-question-id.dto";
import { ArchiveQuestionService } from "./archive-question.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class ArchiveQuestionGateway {
  constructor(
    private readonly archivedQuestionService: ArchiveQuestionService
  ) {}

  @SubscribeMessage("all-incoming-questions")
  getAllIncomingQuestions() {
    return this.archivedQuestionService.getAllQuestions();
  }

  @WsValidationPipe()
  @SubscribeMessage("delete-archived-question")
  async deleteQuestion(@MessageBody() deleteQuestionDto: DeleteQuestionIdDto) {
    await this.archivedQuestionService.deleteQuestion(deleteQuestionDto);
    return { message: "Successfully delete question from archived" };
  }
}
