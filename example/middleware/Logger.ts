import { AureolinMiddleware, Middleware, Context } from '../../src'

@Middleware()
export default class Logger implements AureolinMiddleware {
    use = (ctx: Context): void => {
        console.log('Logger middleware', ctx.request.method, ctx.request.url)
    }
}
