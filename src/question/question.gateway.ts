import { ArgumentsHost, Catch } from "@nestjs/common";
import {
  BaseWsExceptionFilter,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { CreateQuestionDto } from "./dtos/create-question.dto";
import { QuestionService } from "./question.service";

@Catch()
export class AllExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}

@WebSocketGateway()
export class QuestionGateway {
  constructor(private readonly questionService: QuestionService) {}

  @SubscribeMessage("messageToServer")
  handle(): string {
    return "Hello";
    // return { event: "messageToClient", data: "Hello" };
  }

  @WsValidationPipe()
  @SubscribeMessage("create-question")
  createQuestion(@MessageBody() createQuestionDto: CreateQuestionDto) {
    return createQuestionDto;
  }
}
