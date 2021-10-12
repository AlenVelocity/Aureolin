<div align=center>
<a href="https://imgbb.com/"><img src="https://i.ibb.co/h1gT27Q/Aureolin.png" alt="Aureolin" border="0" >



# Aureolin
**Aureolin** is a simple, fast, and powerful REST API framework for Node.js with a focus on simplicity and performance.

</div>

----
### [Starter Project](https://github.com/AlenSaito1/Aureolin-starter)

## Installation

```sh
npm install aureolin
```

## Example

To get started with Aureolin, you need to call the `create` function exported by Aureolin.

The `create` function takes an options object as its first and only argument.


```TS
/** @filename main.ts */

import { create } from 'aureolin'
// import create from 'aureolin'
// const { create } from require('aureolin')

const main = () => {
    const app = create({
        port: 3000
    })
}
```

Option Schema is as follows

```TS
interface CreateOptions {
    port: number // port to listen on
    controllersPath?: string // dir where controllers are located
    middlewarePath?: string // dir where middleware are located
    logger?: Logger // Pino Logger
}
```
### Controllers

To create a controller you need to import the `Controller` decorator from Aureolin. 

Decorators for all Http methods are provided

The return value of the methods prefixed withe an Http Decorator in a controllers are sent as the response

```TS
/** @filename controllers/hello.ts */
import { Controller, Get } from 'aureolin'

@Controller('/hello')
export class HelloController {
    @Get('/')
    async hello() {
        return 'Hello World!'
    }

    @Get('/:name')
    async helloName({ params: { name } }: Context) {
        return `Hello ${name}!`
    }

    @Get('/:name/:age')
    async helloNameAge({ params: { name, age } }: Context) {
        return `Hello ${name}! You are Probably ${age} years old.`
    }    
}
```

## Middlewares

Middlewares are functions that are called before the controller methods are called.

The example middleware shown below will log the method and path to the console every time a request is made.

```TS
/** @filename middlewares/logger.ts */
import { Middleware, AureolinMiddleware } from 'aureolin'

@Middleware()
export class Logger implements AureolinMiddleware {
    async use(ctx: Context) {
        console.log(`${ctx.method} ${ctx.path}`)
    }
}
```

After you have created all the necessary controllers and middlewares and placed them in the correct directories, you can create a new application.

```TS
/** @filename main.ts */

import { create } from 'aureolin'

const main = () => {
    const app = create({
        port: 3000,
        controllersPath: 'controllers',
        middlewarePath: 'middlewares'
    })
}

main()
```

After you have created the application, Visit ```http://localhost:3000/hello``` to see the output of the `hello` controller.

---
Thank you for using Aureolin!














