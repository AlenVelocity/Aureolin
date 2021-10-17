import EventEmitter from 'events'
import Application from 'koa'
import { Logger } from 'pino'
import { AureolinApplication } from './AureolinApplication'

/**
 * Response body
 * @example
 * ```json
 * {
 *      "status": "success",
 *      "data": {
 *          "message": "Hello World"
 *      }
 * }
 * ```
 */
export type ResBody = string | Record<string, unknown> | Buffer | Array<unknown> | null

/**
 * Function which returns a response body
 * @example
 * ```ts
 * export const get = async (ctx: Context) => {
 *  return {
 *   message: 'Hello World'
 * }
 * ```
 */
export type ResponseFunc = () => ResBody | Promise<ResBody>

/**
 * Koa context
 * @see https://koajs.com/#context
 */
export type Context = Application.ParameterizedContext
export type Interceptor = (context: Context) => Promise<void> | void

/**
 * HTTP Endpoint definition
 */
export interface EndpointDefinition {
    /**
     * Path of the endpoint
     * @type {string}
     * @example '/hello'
     * @public
     */
    path: string
    /**
     * HTTP method of the endpoint
     * @type {string}
     * @example 'GET'
     * @public
     */
    method: Methods
    /**
     * Property key of the method to be called
     * @type {string}
     * @public
     */
    propertyKey: string
    /**
     * Controller class name
     * @type {string}
     * @public
     */
    controller: string
}

/**
 * Parameter definition
 */
export interface ParameterDefinition {
    /**
     * Parameter Type
     * @type {string}
     * @example 'ctx'
     * @public
     */
    type: string
    /**
     * Controller Class
     * @type {string}
     * @example 'HelloController'
     * @public
     */
    controller: string
    /**
     * Property key of the method to be called
     * @type {string}
     * @public
     */
    propertyKey: string
    /**
     * Parameter index
     * @type {number}
     * @example 0
     * @public
     */
    index: number
    /**
     * Metadata
     * @type {Record<string, string | undefined>}
     * @example
     * ```json
     * {
     *     "query": "name"
     * }
     * ```
     * @public
     */
    meta?: Record<string, string | undefined>
}

/**
 * Controller definition
 */
export interface ControllerDefinition {
    /**
     * Path of the endpoint
     * @type {string}
     * @example '/hello'
     * @public
     */
    path: string
    /**
     * Target controller class
     * @type {Function}
     * @public
     * @example
     * ```ts
     * class HelloController {
     *      @Get('/')
     *      async hello(ctx: Context) {
     *      return {
     *          message: 'Hello World'
     *      }
     * }
     * ```
     */
    target: unknown
}

/**
 * HTTP Methods
 */
export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

/**
 * Provider Interface
 */
export interface IProvider {
    /**
     * What to provide
     * @type {string}
     * @example 'database'
     */
    provide: string
    /**
     * Provider class
     * @type {Function}
     * @example
     * ```ts
     * export class DatabaseProvider {
     *      public async getConnection() {
     *          return await new Promise((resolve, reject) => {
     *              const connection = mysql.createConnection({
     *              host: 'localhost',
     *              user: 'root',
     *              password: 'password',
     *              database: 'database'
     *          })
     *          connection.connect(err => {
     *              if (err) {
     *                  reject(err)
     *              }
     *              resolve(connection)
     *          })
     *      })
     * }
     * ```
     */
    target: new () => unknown
}

/**
 * Injector Interface
 */
export interface IInject {
    /**
     * What to inject
     */
    provide: string
    /**
     * Injector class
     * @type {Function}
     */
    controller: string
    /**
     * Parameter index
     * @type {number}
     */
    index: number
}

/**
 * Aureolin Application Config
 */
export interface CreateOptions {
    /**
     * Port to listen on
     * @type {number}
     * @example 3000
     */
    port: number
    /**
     * Root directory of the application
     * @type {string}
     * @example __dirname
     */
    root?: string
    /**
     * Pino logger instance
     * @type {Logger}
     */
    logger?: Logger
}

export interface EventsMap {
    'app.ready': AureolinApplication
    'app.start': number
    'load.controller': ControllerDefinition
    'load.controllers.done': never
    'load.providers.done': never
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
