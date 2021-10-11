import endpointStore from '../store/endpoints'

export const Controller = (endpoint: string): ClassDecorator => {
    return ((controller: new () => unknown) => {
        endpointStore.registerController(endpoint, controller)
    }) as ClassDecorator
}
