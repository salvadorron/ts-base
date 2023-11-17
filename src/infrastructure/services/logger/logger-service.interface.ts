import { Logger } from '../../../domain/services/logger/logger.service'
export interface LoggerService extends Logger {
  mute(): void
  unmute(): void
}
