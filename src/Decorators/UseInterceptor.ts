/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import endpointStore from '../store/endpoints'
import { Interceptor } from '../types'

export const UseInterceptor =
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    (interceptor: Interceptor) => (target: any, propertyKey: string, _descriptor: PropertyDescriptor) => {
        endpointStore.registerInterceptor(target.constructor, propertyKey, interceptor)
    }
