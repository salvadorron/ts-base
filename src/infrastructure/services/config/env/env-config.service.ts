import { injectable } from "inversify"
import { configuration } from "../../../../application/services/config/config"
import { ConfigService } from "../../../../domain/services/config/config.service"
import { AdapterConfig } from "../../../../domain/services/config/model/adapter.config"
import { ServiceConfig } from "../../../../domain/services/config/model/service.config"

@injectable()
export class EnvConfigService implements ConfigService {
  adapters: Map<string, AdapterConfig>
  services: Map<string, ServiceConfig>

  constructor() {
    const adapters: any = this.get<any>('adapters')
    const services: any = this.get<any>('SERVICES')

    this.adapters = new Map<string, AdapterConfig>(
      adapters ? Object.keys(adapters).map((key) => [key, adapters[key]]) : []
    )
    this.services = new Map<string, ServiceConfig>(
      services ? Object.keys(services).map((key) => [key, services[key]]) : []
    )
  }

  get<T>(key: string): T | undefined {
    return configuration?.[key]
  }

  getAdapter(key: string): AdapterConfig | undefined {
    if (!this.adapters.has(key)) return undefined
    return this.adapters.get(key)!
  }

  getService(key: string): ServiceConfig {
    if (!this.services.has(key)) throw new Error(`The service ${key} is not configured.`)
    return this.services.get(key)!
  }
}