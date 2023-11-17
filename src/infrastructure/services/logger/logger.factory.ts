import { LoggerService } from './logger-service.interface'

export interface LoggerFactory {
  create(): LoggerService
}
