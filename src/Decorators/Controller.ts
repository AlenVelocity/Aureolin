import endpointStore from '../store/endpoints'

/**
 * Registers a controller class
 * @param {string} endpoint - The path for the controller to be mounted on
 * @returns {ClassDecorator}
 */
export const Controller = (endpoint: string): ClassDecorator => {
    return ((controller: new () => unknown) => {
        endpointStore.registerController(endpoint, controller)
    }) as ClassDecorator
}
