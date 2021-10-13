import { AureolinMiddleware, Middleware, Context } from '../../src'

@Middleware()
export default class Aureolin implements AureolinMiddleware {
    private package = async () => {
        return await import('../../package.json')
    }

    public use = async (ctx: Context): Promise<void> => {
        ctx.res.setHeader('X-Aureolin', 'Aureolin')
        ctx.res.setHeader('X-Aureolin-Version', (await this.package()).version)
    }
}
