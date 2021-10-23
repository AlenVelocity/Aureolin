<div align=center>

# Aureolin
**Aureolin** is a simple, fast, and powerful REST API framework for Node.js with a focus on simplicity and performance. Built With [Koa](https://github.com/koajs/koa)

[![NPM](https://img.shields.io/npm/l/aureolin?style=flat-square&label=License)](https://github.com/AlenSaito1/Aureolin/blob/master/LICENSE) [![Discord](https://img.shields.io/discord/898177582829285387?label=Discord&style=flat-square)](https://discord.gg/3Pg2Nw2vjn) [![CodeFactor](https://img.shields.io/codefactor/grade/github/alensaito1/aureolin?style=flat-square&label=Code%20Quality)](https://www.codefactor.io/repository/github/alensaito1/aureolin) [![NPM](https://img.shields.io/npm/dw/aureolin?style=flat-square&label=Downloads)](https://npmjs.com/package/aureolin)


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

const main = async () => {
    const app = await create({
        port: 3000,
        root: __dirname
    })
}
```

Option Schema is as follows

```TS
interface CreateOptions {
    port: number // port to listen on
    root: string // root directory where providers, middleware, and controllers are located
    middleware?: Middleware[] // middleware to load
    logger?: Logger // Pino Logger
}
```
### Controllers

To create a controller you need to import the `Controller` decorator from Aureolin. 

Decorators for all Http methods are provided

The return value of the methods prefixed with an Http Decorator in a controller are sent as the response
Response can be a string, number, object, array, or a Promise.

Use the provided Parameter Decorators to let Aureolin to know what parameters pass to the to the controller methods.

```TS
/** @filename controllers/hello.ts */
import { Controller, Context, Get, Ctx, Param } from 'aureolin'

@Controller('/hello')
export class HelloController {
    @Get('/')
    async hello() {
        return 'Hello World!'
    }

    @Get('/:name')
    async helloName(@Ctx() { params: { name } }: Context) {
        return `Hello ${name}!`
    }

    @Get('/:name/:age')
    async helloNameAge(@Param('name') name: string, @Param('age') age: string) {
        return `Hello ${name}! You are Probably ${age} years old.`
    }    
}
```

## Providers

Providers are a way to inject dependencies into your controllers.
Use the `provider` decorator to decalre a class as a provider.
Use the `inject` decorator to inject provider into your controllers.

`@Provider(provide: string)`
```TS
/** @filename providers/time.ts */
import { Provider } from 'aureolin'

@Provider('time')
export default class TimeProvider {
    async getTime() {
        return new Date().toLocaleTimeString()
    }
}
```
`@Inject(provide: string)`
```TS
/** @filename controllers/time.ts */
import { Controller, Context, Get, Inject } from 'aureolin'
import type TimeProvider from 'providers/time.ts'

@Controller('/time')
export class TimeController {

    constructor(@Inject('time') private timeProvider: TimeProvider) {}

    @Get('/')
    async getTime() {
        return timeProvider.getTime()
    }
}
```

## Middlewares

There are two ways to use middlewares.

1. Add `middlewares` field in the options object 

```TS
import { create } from 'aureolin'

create({
    port: 3000,
    root; __dirname,
    middlewares: [
        (ctx: Context, next: () => Promise<void>) => {
            console.log('Middleware 1')
            return next()
        },
        (ctx: Context, next: () => Promise<void>) => {
            console.log('Middleware 2')
            return next()
        }
    ]
})
```
These middleware will run on every request 

2. Use the `@Middleware` and `@ControllerMiddleware` Decorator factories

```TS
import { Middleware, Controller, ControllerMiddleware, Context, Get, Ctx, Param, NextFunction } from 'aureolin'

@Contoller('cakes')
@ContollerMiddleware([
    (ctx: Context, next: Next) => {
        console.log('Controller Middleware 1')
        return next()
    }
])
export default class CakesController {

    @Get('/cheesecake')
    @Middleware([cheesecakemiddleware])
    public cheesecake() {
        return {
            name: 'Cheesecake',
            ingredients: ['cheese', 'flour', 'sugar']
        }
    }

    @Get('redvelvet')
    @Middleware([redvelvetmiddleware])
    public redvelvel() {
        return {
            name: 'Red Velvet',
            ingredients: ['cheese', 'flour', 'sugar', 'red stuff']
        }
    }
}
```

## Error Handling

Aureolin takes care of error handling for you.
Use the exported `Exception` or Prebuilt classes to throw error dircetly in your code and aureolin will handle it.

```ts
/** @filename controllers/error.ts */
import { Controller, Context, Get, BadRequestException } from 'aureolin'

@Controller('/error')
export class ErrorController {
    @Get('/')
    async error(): never {
        throw new Exception('Something went wrong!', 500)
    }

    @Get('/:name')
    async errorName(@Ctx() { params: { name } }: Context): never {
        if (!name) throw new BadRequestException(`${name} is not a valid name!`, 400)
    }
}
```
----

And finally you can call `create()` to start your app.

```TS
/** @filename main.ts */

import { create } from 'aureolin'
import { Middleware } from '/Middleware'
const main = async () => {
    const app = await create({
        port: 3000,
        root: __dirname,
        middlewares: [Middleware]
    })
}

main()
```

After you have created the application, Visit ```http://localhost:3000/hello``` to see the output of the `hello` controller.

---
Thank you for using Aureolin!














