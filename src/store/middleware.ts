import { Middleware } from '../types'

class MiddlewareStore {
    private readonly list = new Map<string, Middleware['use']>()

    public register = (Middleware: Middleware['use']) => {
        this.list.set(Middleware.name, Middleware)
    }
}

const middlewareStore = new MiddlewareStore()

export default middlewareStore
