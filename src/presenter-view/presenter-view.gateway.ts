import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { WSExceptionInterceptor } from "src/common/decorators/ws-exception.decorator";

@WSExceptionInterceptor()
@WebSocketGateway()
export class PresenterViewGateway {
  @SubscribeMessage("message")
  handleMessage() {
    return "Hello world!";
  }
}
