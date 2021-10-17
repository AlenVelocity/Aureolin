import Router from '@koa/router'
import { existsSync } from 'fs'
import Application from 'koa'
import { handleRoute } from './handlers/route'
import endpointStore from './store/endpoints'
import { CreateOptions, Methods } from './types'
import { readdirRecursive } from './utils'
import Emitter from './Emitter'
import logger, { Logger } from 'pino'

/**
 * The Aureolin Application class.
 * @class
 * @extends Emitter
 */
export class AureolinApplication extends Emitter {
    /**
     * Koa Application Instace which acts as the base http server
     * @type {Application}
     * @memberof AureolinApplication
     * @private
     * @readonly
     */
    private readonly server = new Application()

    /**
     * Koa Router Instance
     * @type {Router}
     * @memberof AureolinApplication
     * @private
     * @readonly
     */
    private readonly router = new Router()

    /**
     * Http-Methods - Router Map
     * @type {Map<Methods, Router>}
     * @memberof AureolinApplication
     * @private
     * @readonly
     */
    private readonly methods = new Map<Methods, Router['get']>()

    /**
     * Pino Logger
     * @type {Logger}
     * @memberof AureolinApplication
     * @private
     * @readonly
     */
    public logger: Logger

    /**
     * Aureolin Application Constructor
     * @param {CreateOptions} options - Options to create the application
     * @memberof AureolinApplication
     * @constructor
     */
    constructor(private options: CreateOptions) {
        super()
        this.logger =
            options.logger ||
            logger({
                prettyPrint: {
                    colorize: true,
                    ignore: 'pid,hostname',
                    translateTime: 'yyyy-mm-dd HH:MM:ss.l'
                }
            })
        for (const method of ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']) {
            this.methods.set(method as Methods, this.router[method.toLowerCase() as 'get'])
        }
        //prettier-ignore
        (async () => {
            await this.loadProviders()
            await this.loadControllers()
            this.configureMiddlewares()
            this.configureRouters()
            this.emit('app.ready', this)
        })()
    }

    /**
     * Get the path prefixed with the root directory
     * @param {string} path - Path to be prefixed
     * @returns {string} dir - Path prefixed with the root directory
     */
    private path = (path: string) => (this.options.root ? this.options.root.concat('/', path) : path)

    /**
     * Starts the application
     * @memberof AureolinApplication
     * @returns {Promise<void>}
     * @public
     * @async
     */
    public start = async (): Promise<void> => {
        this.server.listen(this.options.port, () => {
            this.emit('app.start', this.options.port)
            this.logger.info(`Server started on port ${this.options.port}`)
        })
    }

    /**
     * Loads the providers
     * @memberof AureolinApplication
     * @returns {Promise<void>}
     * @private
     * @async
     */
    private loadProviders = async (): Promise<void> => {
        const providersPath = this.path('providers')
        if (!providersPath) return
        const providers = readdirRecursive(providersPath)
        for (const provider of providers) {
            await import(provider)
        }
        this.emit('load.providers.done')
        this.logger.info(`Loaded ${providers.length} Providers`)
    }

    /**
     * Loads the controllers
     * @memberof AureolinApplication
     * @returns {Promise<void>}
     * @private
     * @async
     */
    private loadControllers = async (): Promise<void> => {
        const controllersPath = this.path('controllers')
        if (!existsSync(controllersPath)) return
        const files = readdirRecursive(controllersPath)
        for (const file of files) {
            await import(file)
        }
        this.emit('load.controllers.done')
        this.logger.info(`Loaded ${files.length} controllers`)
    }

    /**
     * Configures the middleware
     * @memberof AureolinApplication
     * @returns {void}
     * @private
     */
    private configureMiddlewares = (): void => {
        // TODO
    }

    /**
     * Configures the routers
     * @memberof AureolinApplication
     * @returns {void}
     * @private
     */
    private configureRouters = (): void => {
        for (const endpoint of endpointStore) {
            const controller = endpointStore.getController(endpoint.controller)
            if (!controller) throw new Error(`Controller ${endpoint.controller} not found`)
            let path = controller.path.concat(endpoint.path)
            const last = path.length - 1
            if (path[last] === '/') path = path.substring(0, last)
            const router = this.methods.get(endpoint.method)
            if (!router) throw new Error(`Method ${endpoint.method} not found`)
            router.call(
                this.router,
                path,
                handleRoute(
                    (controller.target as Record<string, () => unknown>)[endpoint.propertyKey].bind(controller.target),
                    endpoint.controller,
                    endpoint.propertyKey
                )
            )
            this.emit('configure.router', endpoint)
        }
        this.server.use(this.router.routes())
        this.server.use(this.router.allowedMethods())
        this.emit('configure.routers')
        this.logger.info('Configured Routers')
    }

    /**
     * Creates a new instance of AureolinApplication
     * @param {CreateOptions} options - Options for the application
     * @returns {AureolinApplication} - New instance of AureolinApplication
     */
    public static create = (options: CreateOptions): AureolinApplication => new AureolinApplication(options)
}
