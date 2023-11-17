import app from './application/server'
import container from './application/services/injections'
import { TYPES } from './application/services/injections'
import { LoggerFactory } from './infrastructure/services/logger/logger.factory'
import "reflect-metadata"


const logger = container.get<LoggerFactory>(TYPES.LoggerFactory).create()


process.on('uncaughtException', (e: Error): void => {
    logger.error('Uncaugth Exception :', e)
})
process.on('unhandledRejection', (reason, p): void => {
    logger.info('Unhandled Rejection.')
    logger.debug('Promise', p)
    logger.debug('Reason :', reason)
})

app.on('application:booted', app.init)
app.boot()
