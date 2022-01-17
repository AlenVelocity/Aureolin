<div align=center>

# Aureolin
**Aureolin** is a simple, fast, and powerful MVC framework for Node.js with a focus on simplicity and performance. Built With [Koa](https://github.com/koajs/koa)

[![NPM](https://img.shields.io/badge/Available%20On-NPM-lightgrey.svg?logo=npm&logoColor=339933&labelColor=white&style=flat-square)](https://npmjs.com/package/aureolin)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FAlenSaito1%2FAureolin.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2FAlenSaito1%2FAureolin?ref=badge_small)

[![NPM](https://img.shields.io/npm/l/aureolin?style=flat-square&label=License)](https://github.com/AlenSaito1/Aureolin/blob/master/LICENSE) [![Discord](https://img.shields.io/discord/898177582829285387?label=Discord&style=flat-square)](https://discord.gg/3Pg2Nw2vjn) [![CodeFactor](https://img.shields.io/codefactor/grade/github/alensaito1/aureolin?style=flat-square&label=Code%20Quality)](https://www.codefactor.io/repository/github/alensaito1/aureolin) [![NPM](https://img.shields.io/npm/dw/aureolin?style=flat-square&label=Downloads)](https://npmjs.com/package/aureolin)[![Prettier](https://img.shields.io/badge/Code_Style-Prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


</div>

----

## Installation

```sh
npm install aureolin
```

## Getting Started

To get started with Aureolin, you need to create a config file named `aureolin.config.js` in the root of your project.

```js
/** @filename aureolin.config.js */

const { join } = require('path')

/** @type {import('aureolin').Config} */
module.exports = {
    root: join(process.cwd(), process.env.NODE_ENV === 'production' ? 'dist' : 'src'),
    port: 4000,
    public: {
        path: '/public',
        dir: './public',
        index: 'index.html'
    },
    views: {
        path: 'views',
        extension: 'hbs',
        map: { 
            hbs: 'handlebars' 
        }
    }
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
Response can be a string, number, object, array, or even a JSX Element (YES! JSX See [Here](https://github.com/alensaito1/aureolin/blob/master/docs/Using-JSX.md))

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

Check out the [Docs Folder](https://github.com/alensaito1/aureolin/tree/master/docs) for more information.


## Key Features

- Decorator based routing
- Highly configurable & scalable
- Server Side Rendering
- Strongly Typed

## Contributing 

- See [Contributing Section](https://github.com/alensaito1/aureolin/blob/master/CONTRIBUTING.md)



---
Thank you for using Aureolin!
















## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FAlenSaito1%2FAureolin.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FAlenSaito1%2FAureolin?ref=badge_large)
