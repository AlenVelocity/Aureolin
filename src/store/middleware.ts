import { MiddlewareClass } from '../types'

class MiddlewareStore implements Iterable<MiddlewareClass> {
    private readonly list = new Map<string, MiddlewareClass>()

    public register = (Middleware: MiddlewareClass) => {
        this.list.set(Middleware.name, Middleware)
    }

    *[Symbol.iterator]() {
        for (const [, Middleware] of this.list) {
            yield Middleware
        }
    }
    
}

const middlewareStore = new MiddlewareStore()

export default middlewareStore
