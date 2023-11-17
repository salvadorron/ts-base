import { HealthController } from './health.controller'

describe('HealthController', (): void => {
  const healthController = new HealthController()

  it('Should create an instance', (): void => {
    expect(healthController).toBeInstanceOf(HealthController)
  })

  it('Should create an instance', async (): Promise<void> => {
    const response = await healthController.get()
    expect(Object.keys(response)).toEqual(['status', 'version', 'date', 'uptime', 'application'])
    expect(response.status).toEqual('The API is healthy')
  })
})
