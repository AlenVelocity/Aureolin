import Router from '@koa/router'
import { existsSync, readdirSync } from 'fs'
import Application from 'koa'
import { handleInterceptor } from './handlers/interceptor'
import { handleRoute } from './handlers/route'
import endpointStore from './store/endpoints'
import middlewareStore from './store/middleware'
import { CreateOptions, Methods } from './types'
import { composeMiddlewares } from './utils'
import Emitter from './Emitter'


export class AureolinApplication extends Emitter {
    private readonly server = new Application()

    private readonly router = new Router()
    private readonly methods = new Map<Methods, Router['get']>()

    constructor(private options: CreateOptions) {
        super();
        for (const method of ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']) {
            this.methods.set(method as Methods, this.router[method.toLowerCase() as 'get'])
        }
        (async () => {
            await this.loadControllers()
            await this.loadMiddleware()
            this.configureMiddlewares()
            this.configureRouters()
            this.emit('app.ready', this)
        })()
    }

    public start = async (): Promise<void> => {
        this.server.listen(this.options.port, () => this.emit('app.start', this.options.port))
    }

    private loadControllers = async (): Promise<void> => {
        const controllersPath = this.options.controllersPath || './controllers'
        if (!existsSync(controllersPath)) return
        for (const file of readdirSync(controllersPath)) {
            if (!file.startsWith('_')) continue
            await import(`${controllersPath}/${file}`)
        }
        this.emit('load.controllers.done')
    }

    private loadMiddleware = async (): Promise<void> => {
        const middlewarePath = this.options.middlewarePath || './middleware'
        if (!existsSync(middlewarePath)) return
        for (const file of readdirSync(middlewarePath)) {
            if (!file.startsWith('_')) continue
            await import(`${middlewarePath}/${file}`)
        }
        this.emit('load.middleware.done')
    }

    private configureMiddlewares = (): void => {
        for (const Middleware of middlewareStore) {
            this.server.use(async (ctx, next) => {
                try {
                    await new Middleware().use(ctx, next)
                    await next()
                } catch (error) {
                    this.emit('error', error)
                    const E = error as Error & { status?: number }
                    const status = E.status || 500
                    ctx.status = status
                    ctx.body = {
                        error: E.message || 'Internal Server Error',
                        status,
                    }
                }
            })
        }
        this.emit('configure.middlewares')
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
                composeMiddlewares(...endpoint.interceptors.map(handleInterceptor)),
                handleRoute((controller.target as Record<string, () => unknown>)[endpoint.propertyKey])
            )
            this.emit('configure.router', endpoint)
        }
        this.server.use(this.router.routes())
        this.server.use(this.router.allowedMethods())
        this.emit('configure.routers')
    }

}
