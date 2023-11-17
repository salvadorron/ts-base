import 'reflect-metadata'
import { ConfigService } from '../../../domain/services/config/config.service'
import container, { TYPES } from '../injections'
process.env.NODE_ENV = 'test'
process.env.PORT = '8080'
process.env.APP__A__B = '3'
import { configuration } from './config'


describe('Config tools tests', (): void => {
    it('Should get env config', (): void => {
        expect(configuration['NODE_ENV']).toStrictEqual('test')
        expect(configuration['PORT']).toStrictEqual('8080')
        expect(configuration['a']).toStrictEqual({ b: '3' })
    })
})
