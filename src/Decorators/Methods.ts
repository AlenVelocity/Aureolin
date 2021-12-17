/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import endpointStore from '../store/endpoints'

/**
 * Sets the suffixed method to be called for 'GET' requests made to the endpoint.
 * @param {string} path The endpoint to use
 * @returns {MethodDecorator}
 */
export const Get = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'GET',
            controller: target.constructor.name
        })
    }
}

/**
 * Sets the suffixed method to be called for 'POST' requests made to the endpoint.
 * @param {string} path The endpoint to use
 * @returns {MethodDecorator}
 */
export const Post = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'POST',
            controller: target.constructor.name
        })
    }
}

/**
 * Sets the suffixed method to be called for 'PUT' requests made to the endpoint.
 * @param {string} path The endpoint to use
 * @returns {MethodDecorator}
 */
export const Put = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'PUT',
            controller: target.constructor.name
        })
    }
}

/**
 * Sets the suffixed method to be called for 'DELETE' requests made to the endpoint.
 * @param {string} path The endpoint to use
 * @returns {MethodDecorator}
 */
export const Delete = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'DELETE',
            controller: target.constructor.name
        })
    }
}

/**
 * Sets the suffixed method to be called for 'PATCH' requests made to the endpoint.
 * @param {string} path The endpoint to use
 * @returns {MethodDecorator}
 */
export const Patch = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'PATCH',
            controller: target.constructor.name
        })
    }
}

/**
 * Sets the suffixed method to be called for 'HEAD' requests made to the endpoint.
 * @param {string} path The endpoint to use
 * @returns {MethodDecorator}
 */
export const Head = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'HEAD',
            controller: target.constructor.name
        })
    }
}

export const Render = (template: string, metadata: Record<string, string | undefined> = {}): MethodDecorator => {
    return (target: any, propertyKey: string | symbol) => {
        endpointStore.registerMethodView({
            template,
            propertyKey: propertyKey.toString(),
            controller: target.constructor.name,
            metadata
        })
    }
}

