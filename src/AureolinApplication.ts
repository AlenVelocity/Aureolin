import Router from '@koa/router'
import { existsSync } from 'fs'
import Application from 'koa'
import { handleRoute } from './handlers/route'
import endpointStore from './store/endpoints'
import middlewareStore from './store/middleware'
import { CreateOptions, Methods } from './types'
import { readdirRecursive } from './utils'
import Emitter from './Emitter'
import logger, { Logger } from 'pino'

export class AureolinApplication extends Emitter {
    private readonly server = new Application()

    private readonly router = new Router()
    private readonly methods = new Map<Methods, Router['get']>()

    public logger: Logger
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
            await this.loadControllers()
            await this.loadMiddleware()
            this.configureMiddlewares()
            this.configureRouters()
            this.emit('app.ready', this)
        })()
    }

    public start = async (): Promise<void> => {
        this.server.listen(this.options.port, () => {
            this.emit('app.start', this.options.port)
            this.logger.info(`Server started on port ${this.options.port}`)
        })
    }

    private loadControllers = async (): Promise<void> => {
        const controllersPath = this.options.controllersPath || './controllers'
        if (!existsSync(controllersPath)) return
        const files = readdirRecursive(controllersPath)
        for (const file of files) {
            await import(file)
        }
        this.emit('load.controllers.done')
        this.logger.info(`Loaded ${files.length} controllers`)
    }

    private loadMiddleware = async (): Promise<void> => {
        const middlewarePath = this.options.middlewarePath || './middleware'
        if (!existsSync(middlewarePath)) return
        const files = readdirRecursive(middlewarePath)
        for (const file of files) {
            await import(file)
        }
        this.emit('load.middleware.done')
        this.logger.info(`Loadded ${files.length} Middleware`)
    }

    private configureMiddlewares = (): void => {
        for (const Middleware of middlewareStore) {
            this.server.use(async (ctx, next) => {
                try {
                    this.logger.info(`Req: ${ctx.method} ${ctx.path}`)
                    await new Middleware().use(ctx, next)
                    await next()
                } catch (error) {
                    this.emit('error', error)
                    const E = error as Error & { status?: number }
                    const status = E.status || 500
                    ctx.status = status
                    ctx.body = {
                        error: E.message || 'Internal Server Error',
                        status
                    }
                }
            })
        }
        this.emit('configure.middlewares')
        this.logger.info('Configured Middlewares')
    }

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
                    (controller.target as Record<string, () => unknown>)[endpoint.propertyKey],
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
}
