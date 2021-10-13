import { Controller, Get, Inject } from '../../src'
import type Package from '../providers/Package'
import type Time from '../providers/Time'

@Controller('/')
export default class Index {
    constructor(@Inject('time') public tm: Time, @Inject('package') public pkg: Package) {}

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

    @Get('routes')
    public routes(): Record<string, string> {
        return {
            '/': 'Welcome to Aureolin!',
            '/about': 'About Aureolin',
            '/time': 'Current time',
            '/routes': 'Routes',
            '/hello/': 'Hello',
            '/hello/:name': 'Hello {name}',
            '/hello/:name/:age': 'Hello {name} {age}'
        }
    }
}
