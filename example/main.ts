import { join } from 'path'
import create from '../src'

const path = (p: string) => join(__dirname, p)

const main = async () => {
    const app = await create({
        port: 3000,
        controllersPath: path('controllers'),
        middlewarePath: path('middleware'),
        providersPath: path('providers')
    })
    app.on('error', console.error)
}

main()
