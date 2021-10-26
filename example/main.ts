import create from '../src'

const main = async () => {
    const app = await create({
        port: 3000,
        root: __dirname
    })
    app.on('error', console.error)
}

main()
