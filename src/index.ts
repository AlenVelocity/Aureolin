import { AureolinApplication } from './AureolinApplication'
import { CreateOptions } from './types'

/**
 * create a new Aureolin application
 * @param {CreateOptions} options
 * @returns {AureolinApplication} the application
 */
export const create = (options: CreateOptions): Promise<AureolinApplication> => {
    return new Promise((resolve) => {
        new AureolinApplication(options).once('app.ready', (app) => {
            app.once('app.start', () => {
                resolve(app)
            })
            app.start()
        })
    })
}

export default create

export { AureolinApplication }
export * from './Decorators'
export * from './types'
export * from './Exception'
export * from './HttpStatus'
export { Config } from './config'

export { React, ElementNode, Fragment } from 'async-jsx-html'
