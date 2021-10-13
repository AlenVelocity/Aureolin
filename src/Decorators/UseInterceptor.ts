/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'koa'
import endpointStore from '../store/endpoints'
import { Interceptor } from '../types'

export const UseInterceptor =
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    (interceptor: Interceptor) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const method = descriptor.value as (ctx: Context) => unknown
        descriptor.value = async (ctx: Context) => {
            await interceptor(ctx)
            return method.apply(target, [ctx])
        }
    }
