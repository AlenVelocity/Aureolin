import { Middleware } from 'koa'

class MiddlewareStore {
    private methodMiddlewares = new Array<{
        controller: string
        method: string
        middlewares: Array<Middleware>
    }>()

    private controllerMiddlewares = new Array<{
        controller: string
        middlewares: Array<Middleware>
    }>()

    public registerMethodMiddleware = (controller: string, method: string, middlewares: Array<Middleware>) => {
        this.methodMiddlewares.push({
            controller,
            method,
            middlewares
        })
    }

    public getMethodMiddleware = (controller: string, method: string) => {
        return this.methodMiddlewares
            .filter((m) => m.controller === controller && m.method === method)
            .map((m) => m.middlewares)
    }

    public registerControllerMiddleware = (controller: string, middlewares: Array<Middleware>) => {
        this.controllerMiddlewares.push({
            controller,
            middlewares
        })
    }

    public getControllerMiddleware = (controller: string) => {
        return this.controllerMiddlewares.filter((m) => m.controller === controller).map((m) => m.middlewares)
    }
}

const middlewareStore = new MiddlewareStore()

export default middlewareStore
