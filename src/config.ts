import { existsSync } from 'fs'
import { join } from 'path'
import { Logger } from 'pino'

/**
 * Configuration object type for Aureolin
 */
export type Config = {
    /**
     * Port to listen on
     * @type {number}
     * @default 3000
     */
    port: number
    /**
     * Dir where `contollers` and `providers` are located
     * @type {string}
     * @default process.cwd() + '/src'
     */
    root: string
    /**
     * Custom pino logger
     * @type {Logger}
     * @default import('pino').default
     */
    logger?: Logger
}

/**
 * Loads config from `aureolin.config.js`
 * @returns {Config} Loaded config object
 */
export const loadConfig = (): Config => {
    const path = process.cwd().concat('aureolin.config.js')
    if (!existsSync(path)) throw new Error('Config file not found')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require(path) as Partial<Config>
    return {
        port: config.port ?? 3000,
        root: config.root ?? join(process.cwd(), 'src')
    }
}
