import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { CreateQuestionDto } from "./dtos/create-question.dto";
import { UpdateQuestionDto } from "./dtos/update-question.dto";
import { QuestionService } from "./question.service";

@WSExceptionInterceptor()
@WebSocketGateway()
export class QuestionGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly questionService: QuestionService) {}

  @SubscribeMessage("messageToServer")
  handle(): string {
    return "Hello";
    // return { event: "messageToClient", data: "Hello" };
  }

  @WsValidationPipe()
  @SubscribeMessage("create-question")
  async createQuestion(@MessageBody() createQuestionDto: CreateQuestionDto) {
    const question = await this.questionService.saveQuestion(createQuestionDto);
    return question;
  }

  @WsValidationPipe()
  @SubscribeMessage("update-question")
  async updateQuestion(@MessageBody() updateQuestionDto: UpdateQuestionDto) {
    const updatedQuestion = await this.questionService.updateQuestion(
      updateQuestionDto
    );
    this.server.emit("on-question-update", updatedQuestion);
    return updatedQuestion;
  }
}
