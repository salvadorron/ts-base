import { Container } from 'inversify'
import { ConfigService } from '../../domain/services/config/config.service'
import { EnvConfigService } from '../../infrastructure/services/config/env/env-config.service'

export const TYPES = {
    LoggerFactory: 'LoggerFactory',
    ConfigService: 'ConfigService',
}
const container = new Container()
container.bind<ConfigService>(TYPES.ConfigService).to(EnvConfigService).inSingletonScope()
export default container

import getDecorators from 'inversify-inject-decorators'
import { ConsoleLoggerFactory } from '../../infrastructure/services/logger/console/console-logger-factory.service'
import { LoggerFactory } from '../../infrastructure/services/logger/logger.factory'


container.bind<LoggerFactory>(TYPES.LoggerFactory).to(ConsoleLoggerFactory).inSingletonScope()

export const { lazyInject } = getDecorators(container)

