import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { TimerService } from "./timer.service";

@WebSocketGateway()
export class TimerGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly timerService: TimerService) {}

  @SubscribeMessage("start-timer")
  startTimer() {
    setInterval(() => {
      this.timerService.incrementTimer();
      const time = this.timerService.getTimeAsClock();

      this.server.emit("get-timer", time);
    }, 1000);
  }
}
