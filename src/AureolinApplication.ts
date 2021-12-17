import Router from '@koa/router'
import { existsSync } from 'fs'
import Application from 'koa'
import { handleRoute } from './handlers/route'
import endpointStore from './store/endpoints'
import { Methods } from './types'
import { readdirRecursive } from './utils'
import Emitter from './Emitter'
import logger from 'pino'
import middlewareStore from './store/middleware'
import bodyParser from 'koa-bodyparser'
import { Config } from './config'
import serve from 'koa-static'
import views from 'koa-views'
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
    public logger = logger({
        prettyPrint: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'yyyy-mm-dd HH:MM:ss.l'
        }
    })

    /**
     * Aureolin Application Constructor
     * @param {CreateOptions} options - Options to create the application
     * @memberof AureolinApplication
     * @constructor
     */
    constructor(private options: Config) {
        super()

        for (const method of ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']) {
            this.methods.set(method as Methods, this.router[method.toLowerCase() as 'get'])
        }
        //prettier-ignore
        (async () => {
            await this.loadProviders()
            await this.loadControllers()
            this.configureMiddleware()
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

    private configureMiddleware = () => {
        this.router.use(bodyParser(), async (ctx, next) => {
            this.logger.info(`Request ${ctx.request.method} ${ctx.request.url}`)
            await next()
        })

        if (this.options.public) {
            const { dir = './public', ...options } = this.options.public
            this.router.use(serve(dir, options))
        }

        if (this.options.views) {
            const { path = 'views', ...options } = this.options.views
            this.router.use(views(path, options))
        }

        for (const [controller, { path }] of endpointStore.getControllers()) {
            const middlewares = middlewareStore.getControllerMiddleware(controller)
            for (const middleware of middlewares.flat()) {
                this.router.use(path, middleware)
            }
            const endpoints = endpointStore.getControllerEndpoints(controller)
            for (const endpoint of endpoints) {
                const endpointPath = this.getPath(path, endpoint.path)
                const middleware = middlewareStore.getMethodMiddleware(endpoint.controller, endpoint.propertyKey)
                this.router.use(endpointPath, ...middleware.flat())
            }
        }
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

    private getPath = (controller: string, endpoint: string): string => {
        let path = `${controller}${
            endpoint.startsWith('/') && controller.endsWith('/')
                ? endpoint.slice(1)
                : !endpoint.startsWith('/') && !controller.endsWith('/')
                ? '/'.concat(endpoint)
                : endpoint
        }`
        const last = path.length - 1
        if (path[last] === '/') path = path.substring(0, last)
        return path
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
            const path = this.getPath(controller.path, endpoint.path)
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
     * @param {Config} options - Options for the application
     * @returns {AureolinApplication} - New instance of AureolinApplication
     */
    public static create = (options: Config): AureolinApplication => new AureolinApplication(options)
}
