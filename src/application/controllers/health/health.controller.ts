import { Get, JsonController } from 'routing-controllers'
import HealthService from '../../services/health/health.service'

@JsonController()
export class HealthController {

  @Get('/api/v1/auth/health')
  public async get(): Promise<any> {
    return HealthService.execute()
  }
}
