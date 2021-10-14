/* eslint-disable @typescript-eslint/no-explicit-any */
import paramStore from '../store/param'

/**
 * Marks a parameter to be injected with Koa context.
 */
export const Ctx = (): ParameterDecorator => {
    return (controller: any, key: string | symbol, index: number): void => {
        paramStore.register({
            controller: controller.constructor.name,
            propertyKey: key.toString(),
            index,
            type: 'ctx'
        })
    }
}

/**
 * Marks a parameter to be injected with url query or the specified key.
 * @param query - The query parameter name.
 */
export const Query = (query?: string): ParameterDecorator => {
    return (controller: any, key: string | symbol, index: number): void => {
        paramStore.register({
            controller: controller.constructor.name,
            propertyKey: key.toString(),
            index,
            type: 'query',
            meta: {
                query
            }
        })
    }
}

/**
 * Marks a parameter to be injected with url param or the specified key.
 * @param param - The parameter name.
 */
export const Param = (param?: string): ParameterDecorator => {
    return (controller: any, key: string | symbol, index: number): void => {
        paramStore.register({
            controller: controller.constructor.name,
            propertyKey: key.toString(),
            index,
            type: 'param',
            meta: {
                param
            }
        })
    }
}

/**
 * Marks a parameter to be injected with request body.
 */
export const Body = (): ParameterDecorator => {
    return (controller: any, key: string | symbol, index: number): void => {
        paramStore.register({
            controller: controller.constructor.name,
            propertyKey: key.toString(),
            index,
            type: 'body'
        })
    }
}
