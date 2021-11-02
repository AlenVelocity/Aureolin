import { AureolinApplication } from './AureolinApplication'
import { loadConfig } from './config'

/**
 * create a new Aureolin application
 * @returns {AureolinApplication} the application
 */
export const create = (): Promise<AureolinApplication> => {
    return new Promise((resolve) => {
        new AureolinApplication(loadConfig()).once('app.ready', (app) => {
            app.once('app.start', () => {
                resolve(app)
            })
            app.start()
        })
    })
}

export default create

export type { AureolinApplication }
export * from './Decorators'
export * from './types'
export * from './Exception'
export * from './HttpStatus'
export { Config } from './config'

export { React, ElementNode, Fragment } from 'async-jsx-html'
