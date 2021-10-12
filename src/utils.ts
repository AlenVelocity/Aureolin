import { readdirSync, statSync } from 'fs'
import { Middleware } from 'koa'
import path from 'path'

export const composeMiddlewares = (...middlewares: Array<Middleware>): Middleware => {
    return async (ctx, next) => {
        let index = -1
        const dispatch = async (i: number) => {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'))
            index = 1
            let fn = middlewares[i]
            if (i === middlewares.length) fn = next
            if (!fn) return
            try {
                await fn(ctx, dispatch.bind(null, i + 1))
            } catch (err) {
                ctx.throw(err as Error)
            }
        }
        return dispatch(0)
    }
}

export const readdirRecursive = (dir: string): string[] => {
    const files = new Array<string>()
    const list = readdirSync(dir)
    list.forEach((file) => {
        const filePath = path.join(dir, file)
        const stat = statSync(filePath)
        if (stat.isDirectory()) files.push(...readdirRecursive(filePath))
        else files.push(filePath)
    })
    return files
}
