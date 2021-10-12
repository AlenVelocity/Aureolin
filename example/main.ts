import { join } from 'path'
import create from '../src'

const path = (p: string) => join(__dirname, p)
const main = async () => {
    const app = await create({
        port: 3000,
        controllersPath: path('controllers'),
        middlewarePath: path('middleware'),
    })
    console.log('App Started')
    app.on('error', console.error)
}

main()