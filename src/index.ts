import { AureolinApplication } from './AureolinApplication'
import { CreateOptions } from './types'

export const create = async (options: CreateOptions): Promise<AureolinApplication> => {
    return await new Promise((resolve) => {
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


export {
    AureolinApplication
}
export * from './Decorators'
export * from './types'