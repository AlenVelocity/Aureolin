import { existsSync } from 'fs'
import { ParameterizedContext } from 'koa'
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

    /**
     * Public directory to serve
     * @type {Config['public']}
     */
    public?: {
        /**
         * Public directory
         * @type {string}
         */
        dir: string
        /**
         * Path to map to the public directory
         */
        path?: string
        /**
         * Browser cache max-age in milliseconds. defaults to 0
         * @type {number}
         * @default 0
         */
        maxAge?: number
        /**
         * Allow transfer of hidden files. defaults to false
         * @type {boolean}
         * @default false
         */
        hidden: boolean
        /**
         * Default file name, defaults to 'index.html'
         * @type {string}
         * @default 'index.html'
         */
        index?: string
        /**
         * if true, allows downstream middleware to handle requests first.
         * @type {boolean}
         * @default false
         */
        defer?: boolean
        /**
         * Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.
         * @type {boolean}
         */
        gzip?: boolean
        /**
         *  Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists (note, that brotli is only accepted over https). defaults to true.
         * @type {boolean}
         */
        br: boolean
        /**
         * Function to set custom headers on response.
         * @type {(res: http.ServerResponse, path: string, stat: fs.Stats) => void}
         */
        setHeaders?: (res: ParameterizedContext['res'], path: string) => void
        /**
         * Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to false)
         * @type {boolean}
         * @example
         * ['.html', '.htm']
         */
        extensions?: string[]
    }

    views?: {
        /**
         * Views directory
         * @type {string}
         * @default process.cwd() + '/views'
         */
        path?: string
    } & Parameters<typeof import('koa-views')>[1]
}

/**
 * Loads config from `aureolin.config.js`
 * @returns {Config} Loaded config object
 */
export const loadConfig = (): Config => {
    const path = join(process.cwd(), 'aureolin.config.js')
    if (!existsSync(path)) throw new Error('Config file not found')
    const {
        port = 3000,
        root = join(process.cwd(), 'src'),
        logger,
        views,
        public: pub
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    } = require(path) as Partial<Config>
    return {
        port,
        root,
        logger,
        views,
        public: pub
    }
}
