import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import container, { TYPES } from '../../services/injections'
import { LoggerFactory } from '../../../infrastructure/services/logger/logger.factory'
const HTTPStatusCode = require('http-status-code')

@Middleware({ type: 'before' })
export class ErrorHandlerMiddleware implements KoaMiddlewareInterface {

    private logger = container.get<LoggerFactory>(TYPES.LoggerFactory).create()

    public async use(ctx: any, next: () => Promise<any>): Promise<any> {
        try {
            await next()
            if (ctx.status == 400) {
                this.badRequestHandlers(ctx,
                    {
                        httpCode: ctx.status,
                        ...ctx.response.body,
                        ...ctx.request.header
                    })
            }
            if (ctx.status > 400) {
                this.processError(ctx, { httpCode: ctx.status, ...ctx.response.body })
            }
        } catch (error) {
            this.processError(ctx, error)
        }
    }

    private processError(ctx: any, error: any) {
        if (error['0'] === 'E') {
            this.logger.error('Got an unauthorized request.')
            throw new Error('Unauthorized[401]')
        }
        this.logger.error(JSON.stringify(error))
        const customStatus = error?.message?.match(/\[(.*?)\]/)
        if (customStatus) {
            ctx.status = Number(customStatus[1])
            error.message = HTTPStatusCode.getMessage(Number(customStatus[1]))
        } else {
            ctx.status = error.meta ? error.meta.code : error.httpCode || 500
        }
        ctx.body = { message: error.message }
    }

    private badRequestHandlers(ctx: any, validations: any) {
        this.logger.error(JSON.stringify(validations))
        let errors: string[] = []
        validations.errors.map((error: any) => {
            errors.push(error.property)
        })
        ctx.status = validations.httpCode || 500
        ctx.body = { message: `Please check the following properties:  ${errors.join(', ')}` }
    }
}
