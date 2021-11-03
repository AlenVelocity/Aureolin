# Using JSX

JSX is a syntax extension for JavaScript. It  allows you to write HTML-like syntax. [Learn More](https://reactjs.org/docs/introducing-jsx.html)

To use JSX for responding to requests, you need to set `jsx` field in your `tsconfig.json` to `react` and `jsxFactory` to `h`.

```JSON
"compilerOptions": {
  "jsx": "react",
  "jsxFactory": "h"
}
```

Then, you need to import the `h` function from Aureolin

```TSX
/** @filename src/controllers/HomeController.tsx */
import { h } from 'aureolin'
```

Then, 

After that, you can use JSX in your controller.

```TSX
/** @filename src/controllers/HomeController.tsx */
import { h, Controller, Get } from 'aureolin'

@Controller('/')
export class HomeController {
  @Get('/')
  async index() {
    return <div>Hello, world!</div>
  }
}

