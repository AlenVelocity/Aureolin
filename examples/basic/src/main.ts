import { create } from 'aureolin'

const main = async () => {
    const app = await create()
    app.on('error', console.error)
}

main()
