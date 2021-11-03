import { Context, NextFunction } from 'aureolin'

export const AureolinX = () => {
    return async (ctx: Context, next: NextFunction) => {
        ctx.res.setHeader('X-Aureolin', 'Aureolin')
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        ctx.res.setHeader('X-Aureolin-Version', require('../../package.json').version)
        await next()
    }
}
