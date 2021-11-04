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


# Example:

> HINT: Axios is used for data fetching in this example.

```TSX
/** @filename src/controllers/HomeController.tsx */
import { h, Controller, Get } from 'aureolin'
import axios from 'axios'

@Controller('/')
export class HomeController {
  @Get('/')
  async index() {
    return <div>Hello, world!</div>
  }

  @Get('/followers/:name')
  public async followers(@Param('name') name: string) {
    // TRUE SSR
    const { data } = await axios.get(`https://api.github.com/users/${name}/followers`)
    return <div>{data.map(follower => <div>{follower.login}</div>)}</div>
  }


}

