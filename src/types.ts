import EventEmitter from 'events'
import Application from 'koa'
import { Logger } from 'pino'
import { AureolinApplication } from './AureolinApplication'

export type Body = string | Record<string, unknown> | Buffer | Array<unknown> | null

export type ResponseFunc = () => Body | Promise<Body>

export type Context = Application.ParameterizedContext
export type Interceptor = (context: Context) => Promise<void> | void

export interface EndpointDefinition {
    path: string
    method: Methods
    propertyKey: string
    controller: string
}

export interface ParameterDefinition {
    type: string
    controller: string
    propertyKey: string
    index: number
    meta?: Record<string, string | undefined>
}

export interface ControllerDefinition {
    path: string
    target: unknown
}

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

export interface AureolinMiddleware {
    use: (context: Context, next: () => Promise<void> | void) => Promise<void> | void
}

export type MiddlewareClass = new () => AureolinMiddleware

export interface IProvider {
    provide: string
    target: new () => unknown
}

export interface IInject {
    provide: string
    controller: string
    index: number
}

export interface CreateOptions {
    port: number
    root?: string
    logger?: Logger
}

export interface EventsMap {
    'app.ready': AureolinApplication
    'app.start': number
    'load.controller': ControllerDefinition
    'load.controllers.done': never
    'load.middleware.done': never
    'load.providers.done': never
    'configure.middlewares': never
    'configure.router': EndpointDefinition
    'configure.routers': never
    error: unknown
}

export interface AureolinEventEmitter extends EventEmitter {
    on<K extends keyof EventsMap>(event: K, listener: (arg: EventsMap[K]) => void): this
    off<K extends keyof EventsMap>(event: K, listener: (arg: EventsMap[K]) => void): this
    removeallListeners<K extends keyof EventsMap>(event: K): this
    emit<K extends keyof EventsMap>(event: K, arg?: EventsMap[K]): boolean
}
export { Next as NextFunction } from 'koa'
