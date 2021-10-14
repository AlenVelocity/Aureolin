import { AureolinApplication } from './AureolinApplication'
import { CreateOptions } from './types'

/**
 * create a new Aureolin application
 * @param {CreateOptions} options
 * @returns {AureolinApplication} the application
 */
export const create = (options: CreateOptions): Promise<AureolinApplication> => {
    return new Promise((resolve) => {
        new AureolinApplication(options).on('app.ready', (app) => {
            app.on('app.start', () => {
                app.removeAllListeners('app.start')
                app.removeAllListeners('app.ready')
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
