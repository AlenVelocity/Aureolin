import { ControllerDefinition, EndpointDefinition } from '../types'
import providerStore from './provider'

class EndpointStore implements Iterable<EndpointDefinition> {
    private readonly controllers = new Map<string, ControllerDefinition>()
    private readonly list = new Map<string, EndpointDefinition>()
    private readonly renders = new Set<{ controller: string; method: string }>()

    public registerEndpoint = (definition: EndpointDefinition) => {
        const key = `${definition.controller}-${definition.propertyKey}`
        this.list.set(key, definition)
    }

    public registerController = (path: string, Controller: new (...args: unknown[]) => unknown) => {
        const inject = providerStore.getInject(Controller.name)
        const target = new Controller(
            ...inject
                .sort((a, b) => a.index - b.index)
                .map((i) => {
                    return providerStore.getProvider(i.provide)
                })
        )
        this.controllers.set(Controller.name, {
            path,
            target
        })
    }

    public *[Symbol.iterator](): Iterator<EndpointDefinition> {
        for (const endpoint of this.list.values()) {
            yield endpoint
        }
    }

    public getController = (controller: string): ControllerDefinition | undefined => {
        return this.controllers.get(controller)
    }

    public getControllers = (): Array<[string, ControllerDefinition]> => {
        return [...this.controllers.entries()]
    }

    public getControllerEndpoints = (controller: string): Array<EndpointDefinition> => {
        const controllerDefinition = this.controllers.get(controller)
        if (!controllerDefinition) return []
        return [...this.list.values()].filter((e) => e.controller === controller)
    }

    public shouldRender = (controller: string, method: string): boolean => {
        return this.renders.has({
            controller,
            method
        })
    }

    public setRender = (controller: string, method: string) => {
        this.renders.add({
            controller,
            method
        })
    }
}

const endpointStore = new EndpointStore()

export default endpointStore
