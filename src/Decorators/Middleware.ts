import middlewareStore from '../store/middleware'

/**
 * Registers a middleware class.
 */
export const Middleware = (): ClassDecorator => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (middleware: any) => {
        middlewareStore.register(middleware)
    }
}
