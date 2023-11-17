import container, { TYPES } from '../../../../application/services/injections'
import { ConfigService } from '../../../../domain/services/config/config.service'
import { Logger } from '../../../../domain/services/logger/logger.service'
import { LoggerService } from '../logger-service.interface'
import { MuteLogger } from '../mute/mute-logger.service'

export class ConsoleLogger implements Logger, LoggerService {
  private logger: Logger
  private fixDetail: (message: string, data: any) => [string, any?]
  private metadata: any
  private preLog: (level: Level, message: string, detail: any) => void

  constructor() {
    this.logger = console
    this.preLog = this.metadata ? this.logWithMetadata : this.logWithoutMetadata
    this.fixDetail = this.fixDetailFunc()
  }

  public error(message: string, detail?: any): void {
    this.preLog('error', message, detail)
  }

  public log(message: string, detail?: any): void {
    this.preLog('log', message, detail)
  }

  public info(message: string, detail?: any): void {
    this.preLog('info', message, detail)
  }

  public debug(message: string, detail?: any): void {
    this.preLog('debug', message, detail)
  }

  public cleanLog(message: string): void {
    console.log(message)
  }

  public mute() {
    this.logger = new MuteLogger()
  }

  public unmute() {
    this.logger = console
  }

  private logWithMetadata(level: Level, message: string, detail: any) {
    const { metadata } = this
    this.logger[level](...this.fixDetail(message, { detail, metadata }))
  }
  private logWithoutMetadata(level: Level, message: string, detail: any) {
    this.logger[level](...this.fixDetail(message, detail))
  }

  private fixDetailFunc(): (message: string, data: any) => [string, any?] {
    const configService = container.get<ConfigService>(TYPES.ConfigService)
    const env = configService.get('NODE_ENV')
    const isDeployed = env === 'production' || env === 'staging'
    if (isDeployed) {
      return (message: string, data: any) => [`${message} ${JSON.stringify(data)}`]
    }
    return (message: string, data: any) => data ? [message, { ...data, data: JSON.stringify(data) }] : [message]
  }
}

type Level = 'error' | 'info' | 'log' | 'debug'

const appLogger = new ConsoleLogger()

export default appLogger
