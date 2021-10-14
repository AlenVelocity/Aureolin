/* eslint-disable @typescript-eslint/no-explicit-any */
import providerStore from '../store/provider'

/**
 * Register a provider
 * @param provide - The provider to be registered
 */
export const Provider = (provide: string): ClassDecorator => {
    return (target: any) => {
        providerStore.registerProvider({
            provide,
            target
        })
    }
}

/**
 * Inject a provider into a class constructor
 * @param inject - The provider to be injected
 */
export const Inject = (inject: string): ParameterDecorator => {
    return (controller: any, key: string | symbol, index: number) => {
        if (key !== undefined) throw new Error('Inject decorator can only be used on constructor parameters')
        providerStore.registerInject({
            provide: inject,
            controller: controller.name,
            index
        })
    }
}
