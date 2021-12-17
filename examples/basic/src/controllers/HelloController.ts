import { Controller, Get, Context, Ctx, Param, Render } from 'aureolin'

@Controller('/hello/')
export default class HelloController {
    @Get('')
    public index(): string {
        return 'Hello'
    }

    @Get(':name')
    public hello(@Ctx() ctx: Context): string {
        return `Hello ${ctx.params.name}!`
    }

    @Get('/:name/:age')
    public helloWithAge(@Param('name') name: string, @Param('age') age: string): string {
        return `Hello ${name}, You're Probably ${age} years old!`
    }

    @Get('/:name/:age/:place')
    @Render('greet', { title: 'Hello' })
    public helloWithAgeAndPlace(
        @Param('name') name: string,
        @Param('age') age: string,
        @Param('place') place: string
    ): Record<string, string> {
        return { name, age, place }
    }
}
