import Koa from 'koa'
import 'reflect-metadata'
import { createKoaServer } from 'routing-controllers'
import { LoggerFactory } from '../infrastructure/services/logger/logger.factory'
import container from './services/injections'
import { TYPES } from './services/injections'
import { ErrorHandlerMiddleware } from './middlewares/error-handler/error-handler.middleware'
import { CorsMiddleware } from "./middlewares/cors/cors.middleware"
import { HealthController } from "./controllers/health/health.controller"
import { ExampleController } from "./controllers/example/example.controller"
import helmet from "koa-helmet"
import cacheControl from "koa-cache-control"
import nocache from 'koajs-nocache'
import { AuthenticationMiddleware } from './middlewares/authentication/authentication.middleware'
import { ConfigService } from '../domain/services/config/config.service'

const logger = container.get<LoggerFactory>(TYPES.LoggerFactory).create()

export interface CustomApp extends Koa {
    boot: () => void
    init: () => void
}

const app = createKoaServer({
    controllers: [
        HealthController,
        ExampleController,
    ],
    middlewares: [
        ErrorHandlerMiddleware,
        AuthenticationMiddleware,
        CorsMiddleware,
    ],
    validation: true,
})


app.boot = async (): Promise<void> => {
    app.emit('application:booted')
}

app.init = (): void => {
    const configService = container.get<ConfigService>(TYPES.ConfigService)
    const port = configService.get('PORT')
    const PORT = port ? Number(port) : 8080
    //if (config.get('mongouri')) DatabaseConnection()
    app.listen(PORT)
    app.use(helmet())
    app.use(nocache())
    app.use(cacheControl({
        noCache: true
    }))
    logger.info(`Server started on port: ${PORT}`)
    app.emit('application:started')
}

export default app
