/* eslint-disable @typescript-eslint/no-explicit-any */
import { h as jsx } from 'nano-jsx'

export const h = (...args: Parameters<typeof jsx>): any => {
    if ((globalThis as any).document) return jsx(...args)
    return () => jsx(...args)
}