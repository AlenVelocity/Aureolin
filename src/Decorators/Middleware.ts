/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware as TMiddleware } from 'koa'
import middlewareStore from '../store/middleware'

export const Middleware = (middleware: TMiddleware[]): MethodDecorator => {
    return (target: any, propertyKey: string | symbol) => {
        middlewareStore.registerMethodMiddleware(target.constructor.name, propertyKey.toString(), middleware)
    }
}

export const ControllerMiddleware = (middleware: TMiddleware[]): ClassDecorator => {
    return (target: any) => {
        middlewareStore.registerControllerMiddleware(target.name, middleware)
    }
}
