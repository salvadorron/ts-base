// @ts-ignore
import { injectable } from 'inversify'
import { version } from '../../../../package.json'
import { ConfigService } from '../../../domain/services/config/config.service'
import { AdapterConfig } from '../../../domain/services/config/model/adapter.config'
import { ServiceConfig } from '../../../domain/services/config/model/service.config'

function createConfigObject() {
  const configs = process.env
  const { PORT, NODE_ENV, LOG_LEVEL } = configs
  return Object.keys(configs).filter((key) => /^APP__.+/.test(key))
    .reduce((array, key) => {
      recursiveFunc(key.replace(/^APP__/, '').split('__').reverse(), array, configs[key])
      return array
    }, { PORT, NODE_ENV, LOG_LEVEL, VERSION: version })
}

function recursiveFunc(keys: string[], array: any, value: any) {
  // @ts-ignore
  const key = toCamelcase(keys.pop())
  if (keys.length) {
    array[key] = array[key] || {}
    recursiveFunc(keys, array[key], value)
  } else { array[key] = value }
}

function toCamelcase(text: string): string {
  return text.split('_').map((t, i) => i > 0 ? t[0] + t.slice(1).toLowerCase() : t.toLowerCase()).join('')
}

export const configuration: any = createConfigObject()