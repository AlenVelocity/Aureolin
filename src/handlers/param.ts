import { Context } from '../types'

export const getParam = (ctx: Context, name: string, meta: Record<string, string | undefined> = {}): unknown => {
    switch (name) {
        case 'query':
            return meta?.['query'] ? ctx.query?.[meta['query']] : ctx.query
        case 'param':
            return meta?.['param'] ? ctx.params?.[meta['param']] : ctx.params
        case 'body':
            return ctx.request.body
        case 'ctx':
            return ctx
        case 'res':
            return ctx.response
        case 'req':
            return ctx.request
        case 'header':
            return meta?.['header'] ? ctx.header?.[meta['header']] : ctx.header
        default:
            return undefined
    }
}
