import { ControllerDefinition, EndpointDefinition, Interceptor } from '../types'

class EndpointStore implements Iterable<EndpointDefinition> {
    private readonly controllers = new Map<string, ControllerDefinition>()
    private readonly list = new Map<string, EndpointDefinition>()

    public registerEndpoint = (definition: EndpointDefinition) => {
        const key = `${definition.controller}-${definition.propertyKey}`
        definition.interceptors = definition.interceptors || []
        this.list.set(key, definition)
    }

    public registerController = (path: string, Controller: new () => unknown) => {
        const target = new Controller()
        this.controllers.set(Controller.name, {
            path,
            target
        })
    }

    public registerInterceptor = (controller: string, propertyKey: string, Interceptor: Interceptor) => {
        const key = `${controller}-${propertyKey}`
        const endpoint = this.list.get(key)
        if (endpoint) endpoint.interceptors.push(Interceptor)
        else throw new Error(`Endpoint ${key} not found`)
    }

    public *[Symbol.iterator](): Iterator<EndpointDefinition> {
        for (const endpoint of this.list.values()) {
            yield endpoint
        }
    }

    public getController = (controller: string): ControllerDefinition | undefined => {
        return this.controllers.get(controller)
    }
}

const endpointStore = new EndpointStore()

export default endpointStore
