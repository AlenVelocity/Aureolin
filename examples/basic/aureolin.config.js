const { join } = require('path')

/** @type {import('aureolin').Config} */
console.log(process.env.NODE_ENV)
module.exports = {
    root: join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'src'),
    port: 3000
}