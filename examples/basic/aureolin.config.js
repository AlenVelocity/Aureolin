const { join } = require('path')

/** @type {import('aureolin').Config} */
module.exports = {
    root: join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'src'),
    port: 3000,
    public: {
        path: '/public',
        dir: './public',
    },
    views: {
        path: 'views',
        extension: 'hbs',
        map: { 
            hbs: 'handlebars' 
        }
    }

}