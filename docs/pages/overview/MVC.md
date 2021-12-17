## MVC

Aureolin supports MVC architecture.

To render a template, first you enable `views` in your config file.

```js
/** @filenme aureolin.config.js */

const { join } = require('path')

/** @type {import('aureolin').Config} */
module.exports = {
    root: join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'src'),
    port: 3000,
    views: {
        // Location of the views
        path: 'views',
        // Extension of the views
        extension: 'hbs',
        // Map extensions to the engine
        map: { 
            hbs: 'handlebars' 
        }
    }

}

```
Then, you need to import the `@Render()` decorator from Aureolin.

It takes 2 parameters:

1. Name of the template to be rendered
2. Optional - Default data to be passed to the template

The return value of the method is also passed to the template.
```TS
import { Controller, Get, Render } from 'aureolin'

@Controller('/hello')
export class HelloController {
    @Get('/')
    @Render('index', {
        /* optional default locals */
    })
    async hello() {
        // Return value will be passed to the template
        return {
            title: 'Hello World!'
        }
    }
}