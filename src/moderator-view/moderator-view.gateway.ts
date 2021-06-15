import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { CreateQuestionDto } from "src/question/dtos/create-question.dto";
import { ModeratorViewService } from "./moderator-view.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class ModeratorViewGateway {
  constructor(private readonly moderatorViewService: ModeratorViewService) {}

  @WsValidationPipe()
  @SubscribeMessage("create-moderator-view-question")
  handleMessage(@MessageBody() createQuestionDto: CreateQuestionDto) {
    return this.moderatorViewService.saveModeratorQuestion(createQuestionDto);
  }
}
