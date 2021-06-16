import { Injectable } from "@nestjs/common";

type Time = string | number;

@Injectable()
export class TimerService {
  private timerValueInMS: number = 0;

  incrementTimer() {
    this.timerValueInMS++;
  }

  getTimeAsClock() {
    const timerValueInSeconds = this.timerValueInMS * 1000;

    let seconds: Time = Math.floor((timerValueInSeconds / 1000) % 60);
    let minutes: Time = Math.floor((timerValueInSeconds / (1000 * 60)) % 60);
    let hours: Time = Math.floor((timerValueInSeconds / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  resetTimer() {
    this.timerValueInMS = 0;
  }
}
