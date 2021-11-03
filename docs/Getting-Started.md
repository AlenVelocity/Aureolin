## Getting Started

To get started with Aureolin, you need to create a config file named `aureolin.config.js` in the root of your project.

```js
/** @filename aureolin.config.js */

const { join } = require('path')

/** @type {import('aureolin').Config} */
module.exports = {
    root: join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'src')
    port: 4000
}
```

Then, use the `create` function to create the app.


```TS
/** @filename src/main.ts */

import { create } from 'aureolin'
// import create from 'aureolin'
// const { create } from require('aureolin')

const main = async () => {
    const app = await create()
}
```

### Controllers

To create a controller you need to import the `Controller` decorator from Aureolin. 

Decorators for all Http methods are provided

The return value of the methods prefixed with an Http Decorator in a controller are sent as the response
Response can be a string, number, object, array, or even a JSX Element (YES! JSX See [Here](https://github.com/alensaito1/aureolin/blob/master/JSX.md))

Use the provided Parameter Decorators to let Aureolin to know what parameters pass to the to the controller methods.

```TSX
/** @filename src/controllers/hello.tsx */
import { Controller, Context, Get, Ctx, Param } from 'aureolin'

@Controller('/hello')
export class HelloController {
    @Get('/')
    async hello() {
        return (
            <div>
                <h1>Hello World!</h1>
                <p>This is a simple example of Aureolin</p>
            </div>
        )
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
/** @filename src/providers/time.ts */
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
/** @filename src/controllers/time.ts */
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

Use the `@Middleware` and `@ControllerMiddleware` Decorator factories

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

    @Get('/redvelvet')
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
/** @filename src/controllers/error.ts */
import { Controller, Context, Get, Exception, BadRequestException } from 'aureolin'

@Controller('/error')
export class ErrorController {
    @Get('/')
    async error(): never {
        throw new Exception('Something went wrong!', 500)
    }

    @Get('/:name')
    async errorName(@Ctx() { params: { name } }: Context): never {
        if (!name) throw new BadRequestException(`${name} is not a valid name!`)
    }
}
```
----

And finally you can call `create()` to start your app.

```TS
/** @filename src/main.ts */

import { create } from 'aureolin'
const main = async () => {
    const app = await create()
}

main()
```

After you have created the application, Visit ```http://localhost:3000/hello``` to see the output of the `hello` controller.