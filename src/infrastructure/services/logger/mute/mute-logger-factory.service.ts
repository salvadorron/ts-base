import { injectable } from 'inversify'
import { LoggerService } from '../logger-service.interface'
import { LoggerFactory } from '../logger.factory'
import { MuteLogger } from './mute-logger.service'

@injectable()
export class MuteLoggerFactory implements LoggerFactory {
  public create(): LoggerService {
    return new MuteLogger()
  }
}
