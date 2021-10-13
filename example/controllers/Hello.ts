import { Controller, Get, Context, Ctx, Param } from '../../src'

@Controller('/hello')
export default class Hello {
    @Get('/')
    public index(): string {
        return '/'
    }

    @Get('/:name')
    public hello(@Ctx() ctx: Context): string {
        return `Hello ${ctx.params.name}!`
    }

    @Get('/:name/:age')
    public helloWithAge(@Param('name') name: string, @Param('age') age: string): string {
        return `Hello ${name}, You're Probably ${age} years old!`
    }

    @Get('/:name/:age/:place')
    public helloWithAgeAndPlace(
        @Param('name') name: string,
        @Param('age') age: string,
        @Param('place') place: string
    ): string {
        return `Hello ${name}, You're Probably ${age} years old, and you live in ${place}!`
    }
}
