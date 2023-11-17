import { AdapterConfig } from "./model/adapter.config"
import { ServiceConfig } from "./model/service.config"

export interface ConfigService {
  get<T>(confKey: string): T | undefined
  getAdapter(key: string): AdapterConfig | undefined
  getService(key: string): ServiceConfig
}