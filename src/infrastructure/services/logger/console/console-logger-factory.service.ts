import { injectable } from 'inversify'
import { LoggerService } from '../logger-service.interface'
import { LoggerFactory } from '../logger.factory'
import { ConsoleLogger } from './console-logger.service'

@injectable()
export class ConsoleLoggerFactory implements LoggerFactory {
  public create(): LoggerService {
    return new ConsoleLogger()
  }
}
