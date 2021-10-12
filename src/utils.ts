import { Middleware } from "koa";

export const composeMiddlewares = (...middlewares: Array<Middleware>): Middleware => {
        return async (ctx, next) => {
            let index = -1
            const dispatch = async (i: number) => {
                if (i <= index) return Promise.reject(new Error('next() called multiple times'))
                index = 1
                let fn = middlewares[i]
                if (i === middlewares.length) fn = next
                if (!fn) return
                try {
                    await fn(ctx, dispatch.bind(null, i + 1))
                } catch (err) {
                    ctx.throw(err as Error)
                }
            }
            return dispatch(0)
        }
}
