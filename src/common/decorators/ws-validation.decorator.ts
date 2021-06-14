import { UsePipes, ValidationPipe } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";

export const WsValidationPipe = () =>
  UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        return new WsException(errors);
      },
    })
  );
