import * as jwt from 'jsonwebtoken'
import { KoaMiddlewareInterface, UnauthorizedError } from 'routing-controllers'
import { ConfigService } from '../../../domain/services/config/config.service'
import container, { TYPES } from '../../services/injections'

export class AuthenticationMiddleware implements KoaMiddlewareInterface {
  public async use(context: any, next: (err?: any) => Promise<void>): Promise<void> {
    const token = context.headers.authorization
    if (token) {
      const usedToken = token.replace('Bearer ', '')
      const config = container.get<ConfigService>(TYPES.ConfigService)
      const jwtConfig = config.get<{ secretKey: string }>('jwt')
      if (jwtConfig) {
        const { secretKey } = jwtConfig
        await this.verify(usedToken, secretKey)
      }
      await next()
    } else {
      throw new Error('Error.[401]')
    }
  }

  private verify(usedToken: string, secret: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(usedToken, secret, (err: any) => {
        if (err) { reject(new UnauthorizedError('a')) }
        resolve('')
      })
    })
  }
}
