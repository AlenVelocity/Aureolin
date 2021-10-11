import { NextFunction } from 'express'
import { Context, Interceptor } from '../types'

export const handleInterceptor =
    (interceptor: Interceptor) =>
    async (context: Context, next: NextFunction): Promise<void> => {
        try {
            await interceptor(context)
            await next()
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const E = err as any
            const status = E.status || 500
            context.res.status(status).send({
                status,
                message: E.message
            })
        }
    }
