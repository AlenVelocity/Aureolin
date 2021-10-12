import { Context } from "koa";
import { AureolinMiddleware, Middleware } from "../../src";

@Middleware()
export default class Logger implements AureolinMiddleware {
    use = (ctx: Context): void => {
        console.log("Logger middleware", ctx.request.method, ctx.request.url)
    }
}