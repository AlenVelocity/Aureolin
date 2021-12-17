# Serve Public Assets

To serve public assets, you need to set `public` field in your config

```JS
/** @filename aureolin.config.js */
const { join } = require('path')

/** @type {import('aureolin').Config} */
module.exports = {
    root: join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'src'),
    port: 3000,
    public: {
        // URL to map to the public folder
        path: '/public',
        // Path to the public directory
        dir: './public',

    }
}

```

## Supported Fields (other than `path` and `dir`)

`maxage` Browser cache max-age in milliseconds. defaults to 0
    
`hidden` Allow transfer of hidden files. defaults to false
    
`index` Default file name, defaults to 'index.html'
    
`defer` If true, serves after return next(), allowing any downstream middleware to respond first.

`gzip` Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with .gz extension exists. defaults to true.

`br` Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with .br extension exists (note, that brotli is only accepted over https). defaults to true.

`setHeaders` Function to set custom headers on response.
    
`extensions` Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to false)

-------

After setting these, Aureolin will serve the public assets.