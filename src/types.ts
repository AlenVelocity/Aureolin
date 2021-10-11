import { Request, Response } from 'express'

export type Body = string | Record<string, unknown> | Buffer | Array<unknown> | null

export type ResponseFunc = () => Body | Promise<Body>

export interface Context {
    req: Request
    res: Response
    state: Record<string, unknown>
}
export type Interceptor = (context: Context) => Promise<void> | void

export interface EndpointDefinition {
    path: string
    method: string
    propertyKey: string
    controller: string
    interceptors: Array<Interceptor>
}

export interface ControllerDefinition {
    path: string
    target: unknown
}

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

export interface Middleware {
    use: (context: Context, next: () => Promise<void> | void) => Promise<void> | void
}

export interface CreateOptions {
    port: number
    controllersPath?: string
    middlewarePath?: string
    routesPath?: string
}
export { NextFunction } from 'express'
