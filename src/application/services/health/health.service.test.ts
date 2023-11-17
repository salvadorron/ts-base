import HealthService from './health.service'
import { HealthDataDto } from './model/health-data.model'

describe('Health use case', (): void => {

  it('Should works', async (): Promise<void> => {
    const response: HealthDataDto = await HealthService.execute()
    expect(Object.keys(response)).toEqual(['status', 'version', 'date', 'uptime', 'application'])
    expect(response.status).toEqual('The API is healthy')
  })

  it('Should be updated the app name in the package.json', async (): Promise<void> => {
    const response: HealthDataDto = await HealthService.execute()
    expect(response.application).toEqual('replace-with-your-app-name')
  })
})
