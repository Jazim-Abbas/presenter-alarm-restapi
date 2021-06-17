import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { WsException } from "@nestjs/websockets";
import { WSExceptionInterceptor } from "../decorators/ws-exception.decorator";

export class WSJwtAuthGuard extends AuthGuard("ws-jwt") {
  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }

  handleRequest(err, user, info, context, status) {
    if (err || !user)
      throw new WsException({ status: 401, message: "Unauthorized" });

    return user;
  }
}
