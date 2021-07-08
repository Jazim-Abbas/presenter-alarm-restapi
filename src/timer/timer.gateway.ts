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
  private server: Server;
  private timerFunc: NodeJS.Timeout;

  constructor(private readonly timerService: TimerService) {}

  @SubscribeMessage("start-timer")
  startTimer() {
    if (!this.timerFunc) {
      this.timerFunc = setInterval(() => {
        this.timerService.incrementTimer();
        const time = this.timerService.getTimeAsClock();

        this.server.emit("get-timer", time);
      }, 1000);
    }
  }

  @SubscribeMessage("stop-timer")
  stopTimer() {
    if (this.timerFunc) {
      clearInterval(this.timerFunc);
      this.timerService.resetTimer();
    }
  }
}
