import 'reflect-metadata'
import { ConsoleLogger } from './console-logger.service'

describe('ConsoleLogger', () => {
  it('Should log level info ok', () => {
    const logger = new ConsoleLogger()
    console.info = jest.fn()
    logger.info('info')
    expect(console.info).toBeCalledWith('info')
  })
  it('Should log level info ok', () => {
    const logger = new ConsoleLogger()
    console.info = jest.fn()
    logger.info('info')
    expect(console.info).toBeCalledWith('info')
  })
  it('LoShould logg level error ok', () => {
    const logger = new ConsoleLogger()
    console.error = jest.fn()
    logger.error('error')
    expect(console.error).toBeCalledWith('error')
  })
  it('Should log level log ok', () => {
    const logger = new ConsoleLogger()
    console.log = jest.fn()
    logger.log('log')
    expect(console.log).toBeCalledWith('log')
  })
  it('Should log level debug ok', () => {
    const logger = new ConsoleLogger()
    console.debug = jest.fn()
    logger.debug('debug')
    expect(console.debug).toBeCalledWith('debug')
  })
  it('Should dont use console when the logger is mute', () => {
    const logger = new ConsoleLogger()
    console.log = jest.fn()
    console.info = jest.fn()
    console.error = jest.fn()
    console.debug = jest.fn()

    logger.mute()

    logger.log('log')
    logger.info('info')
    logger.error('error')
    logger.debug('debug')
    expect(console.log).not.toBeCalled()
    expect(console.info).not.toBeCalled()
    expect(console.error).not.toBeCalled()
    expect(console.debug).not.toBeCalled()

    logger.unmute()

    logger.log('log')
    logger.info('info')
    logger.error('error')
    logger.debug('debug')
    expect(console.log).toBeCalledWith('log')
    expect(console.info).toBeCalledWith('info')
    expect(console.error).toBeCalledWith('error')
    expect(console.debug).toBeCalledWith('debug')
  })
})
