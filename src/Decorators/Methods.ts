/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import endpointStore from '../store/endpoints'

export const Get = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'GET',
            controller: target.constructor.name,
            interceptors: []
        })
    }
}

export const Post = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'POST',
            controller: target.constructor.name,
            interceptors: []
        })
    }
}

export const Put = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'PUT',
            controller: target.constructor.name,
            interceptors: []
        })
    }
}

export const Delete = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'DELETE',
            controller: target.constructor.name,
            interceptors: []
        })
    }
}

export const Patch = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'PATCH',
            controller: target.constructor.name,
            interceptors: []
        })
    }
}

export const Head = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, _descriptor: PropertyDescriptor): void => {
        endpointStore.registerEndpoint({
            path,
            propertyKey: propertyKey.toString(),
            method: 'HEAD',
            controller: target.constructor.name,
            interceptors: []
        })
    }
}
