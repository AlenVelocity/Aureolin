import { Context, NextFunction } from '../../src'

export const Aureolin = () => {
    return async (ctx: Context, next: NextFunction) => {
        console.log('Aureolin', 'middleware')
        ctx.res.setHeader('X-Aureolin', 'Aureolin')
        ctx.res.setHeader('X-Aureolin-Version', (await import('../../package.json')).version)
        await next()
    }
}
