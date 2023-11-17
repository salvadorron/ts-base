import { BodyParam, Get, JsonController, Param, Post, UseBefore } from 'routing-controllers'
import { AuthenticationMiddleware } from '../../middlewares/authentication/authentication.middleware'

@JsonController()
export class ExampleController {
  @Get('/api/v1/examples')
  public async getExamples(): Promise<{ examples: string[] }> {
    return { examples: ['example'] }
  }

  @UseBefore(AuthenticationMiddleware)
  @Get('/api/v1/examples/:id')
  public async getExampleById(
    @Param('id') id: string
  ): Promise<{ example: string }> {
    return { example: `example-${id}` }
  }

  @Post('/api/v1/examples')
  public async postExample(
    @BodyParam('key') key: string
  ): Promise<string> {
    return key
  }
}
