# Controllers

Controllers are the fundamental building blocks of an application. All Controllers should be stored in a directory named `controllers`.

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

