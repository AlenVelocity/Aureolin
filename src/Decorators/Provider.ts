/* eslint-disable @typescript-eslint/no-explicit-any */
import providerStore from '../store/provider'

export const Provider = (provide: string): ClassDecorator => {
    return (target: any) => {
        providerStore.registerProvider({
            provide,
            target
        })
    }
}

export const Inject = (provide: string): ParameterDecorator => {
    return (controller: any, key: string | symbol, index: number) => {
        if (key !== undefined) throw new Error('Inject decorator can only be used on constructor parameters')
        providerStore.registerInject({
            provide,
            controller: controller.name,
            index
        })
    }
}
