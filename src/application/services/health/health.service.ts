// @ts-ignore
import _package from '../../../../package.json'

export default abstract class HealthService {
  public static async execute(): Promise<any> {
    const { version, name } = _package

    return {
      status: 'The API is healthy',
      version,
      date: new Date().toString(),
      uptime: process.uptime(),
      application: name,
    }
  }
}
