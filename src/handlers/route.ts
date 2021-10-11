import { Context } from '../types'

export const handleRoute =
    (cb: (...args: unknown[]) => unknown) =>
    async (context: Context): Promise<void> => {
        try {
            const res = await cb(context)
            if (res) context.res.send(res)
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const E = err as any
            const status = E.status || 500
            context.res.status(status).send({
                status,
                message: E.message
            })
        }
    }
