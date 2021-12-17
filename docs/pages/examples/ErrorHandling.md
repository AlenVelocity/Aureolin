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