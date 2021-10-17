import create from '../src'
import { Aureolin } from './middleware/Aureolin'

const main = async () => {
    const app = await create({
        port: 3000,
        root: __dirname,
        middlewares: [Aureolin()]
    })
    app.on('error', console.error)
}

main()
