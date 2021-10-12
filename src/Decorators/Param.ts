/* eslint-disable @typescript-eslint/no-explicit-any */
import paramStore from '../store/param'

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
