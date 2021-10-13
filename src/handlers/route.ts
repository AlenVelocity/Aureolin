import { Middleware } from 'koa'
import paramStore from '../store/param'
import { Context } from '../types'
import { getParam } from './param'

export const handleRoute = (
    cb: (...args: unknown[]) => unknown,
    controller: string,
    propertyKey: string
): Middleware => {
    const params = paramStore.getParams({
        controller,
        propertyKey
    })
    const sortedParams = params.sort((a, b) => a.index - b.index)
    return async (context: Context): Promise<void> => {
        try {
            const args = sortedParams.map((param) => getParam(context, param.type, param.meta))
            const res = await cb(...args)
            if (res) context.body = res
        } catch (err) {
            const E = err as Error & { status?: number }
            const status = E.status ?? 500
            context.status = status
            context.body = {
                status,
                message: E.message ?? 'Internal Server Error'
            }
        }
    }
}
