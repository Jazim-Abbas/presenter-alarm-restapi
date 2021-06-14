import {
  ArgumentsHost,
  Catch,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  BaseWsExceptionFilter,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
  WsResponse,
} from "@nestjs/websockets";
import { CreateQuestionDto } from "./dtos/create-question.dto";
import { QuestionService } from "./question.service";

@Catch()
export class AllExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}

// @UseFilters(new AllExceptionFilter())
@WebSocketGateway()
export class QuestionGateway {
  constructor(private readonly questionService: QuestionService) {}

  @SubscribeMessage("messageToServer")
  handle(): string {
    return "Hello";
    // return { event: "messageToClient", data: "Hello" };
  }

  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new WsException(errors);
      },
    })
  )
  @SubscribeMessage("create-question")
  createQuestion(@MessageBody() createQuestionDto: CreateQuestionDto) {
    return createQuestionDto;
  }
}
