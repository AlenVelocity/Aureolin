import { Response } from 'koa'
import { Body, Controller, Exception, Get, Header, Inject, Post, Res } from '../../src'
import type PackageProvider from '../providers/PackageProvider'
import type TimeProvider from '../providers/TimeProvider'

@Controller('/')
export default class HomeController {
    constructor(@Inject('time') public tm: TimeProvider, @Inject('package') public pkg: PackageProvider) {}

    @Get('/')
    public index(): string {
        return 'Welcome to Aureolin!'
    }

    @Get('about')
    public async about(): Promise<Record<string, string>> {
        return {
            name: 'Aureolin',
            version: (await this.pkg.get()).version,
            description: 'Aureolin is a Fast, Simple, and Flexible Framework for Node.js',
            npm: 'https://www.npmjs.com/package/aureolin',
            repository: 'https://github.com/Alensaito1/Aureolin'
        }
    }

    @Get('time')
    public time(): string {
        return this.tm.get()
    }

    @Post('post')
    public test(@Body() body: Record<string, unknown>): typeof body {
        return {
            body: body
        }
    }

    @Get('res')
    public res(@Res() res: Response): typeof res {
        return res
    }

    @Get('error')
    public error(): never {
        throw new Exception('This is an Error', 502)
    }

    @Get('headers')
    public headers(@Header() headers: Record<string, string>): Record<string, string> {
        return headers
    }

    @Get('routes')
    public routes(): Record<string, string> {
        return {
            '/': 'Welcome to Aureolin!',
            '/about': 'About Aureolin',
            '/time': 'Current time',
            '/routes': 'Routes',
            '/post': 'Displays the request body',
            '/res': 'Displays the response object',
            '/error': 'Throws an error',
            '/headers': 'Displays the request headers',
            '/hello/': 'Hello',
            '/hello/:name': 'Hello {name}',
            '/hello/:name/:age': 'Hello {name} {age}'
        }
    }
}
