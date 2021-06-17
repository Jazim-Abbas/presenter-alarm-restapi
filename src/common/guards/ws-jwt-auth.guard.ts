import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { WsException } from "@nestjs/websockets";
import { WSExceptionInterceptor } from "../decorators/ws-exception.decorator";

// @WSExceptionInterceptor()
export class WSJwtAuthGuard extends AuthGuard("ws-jwt") {
  getRequest(context: ExecutionContext) {
    // console.log("working .........");
    const handshake = context.switchToWs().getClient().handshake;
    console.log("handshake", handshake);
    return handshake;
  }

  handleRequest(err, user, info, context, status) {
    console.log("error", err);
    console.log("user", user);
    console.log("info", info);
    console.log("context", context);
    console.log("status", status);

    if (err || !user)
      throw new WsException({ status: 401, message: "Unauthorized" });

    return user;
  }
}
