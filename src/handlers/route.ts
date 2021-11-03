import { Middleware } from 'koa'
import { renderSSR } from 'nano-jsx'
import { Exception } from '..'
import endpointStore from '../store/endpoints'
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
            let res = await cb(...args)
            if (res) {
                if (endpointStore.shouldRender(controller, propertyKey)) res = renderSSR(res, {
                    pathname: context.url,
                })
                context.body = res
            }
        } catch (err) {
            const E = err as Partial<Exception>
            const { data, status = 500 } = E
            context.status = status
            context.body = data || {
                status,
                message: E.message || (status === 500 ? 'Internal Server Error' : '')
            }
        }
    }
}
