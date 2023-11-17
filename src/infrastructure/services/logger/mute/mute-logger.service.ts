
import { LoggerService } from '../logger-service.interface'
import { Logger } from "../../../../domain/services/logger/logger.service"

export class MuteLogger implements Logger, LoggerService {

  public error(...args: any): void {
    this.mute()
  }
  public log(...args: any): void {
    this.mute()
  }
  public info(...args: any): void {
    this.mute()
  }
  public debug(...args: any): void {
    this.mute()
  }

  public unmute(): void {
    this.mute()
  }

  // tslint:disable-next-line: no-empty
  public mute() { }
}
