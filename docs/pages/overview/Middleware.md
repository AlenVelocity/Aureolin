## Middlewares

You can use middlewares to intercept requests on Aureolin

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
