import { join } from 'path'
import P from 'pino'
import { create, AureolinApplication } from '../src'

export const start = async (): Promise<AureolinApplication> => {
    return await create({
        port: 3000,
        root: join(__dirname, '..', 'example'),
        logger: P({
            level: 'silent'
        })
    })
}
