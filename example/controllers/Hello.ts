import { Controller, Get, Context } from "../../src";

@Controller('/hello')
export default class Hello {

    @Get('/')
    public index(): string {
        return 'Hello World!';
    }

    @Get('/:name')
    public hello(ctx: Context): string {
        return `Hello ${ctx.params.name}!`;
    }

    @Get('/:name/:age')
    public helloWithAge(ctx: Context): string {
        return `Hello ${ctx.params.name}, You're Probably ${ctx.params.age} years old!`;
    }

    

}