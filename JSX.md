# Using JSX

To use JSX with Aureolin follow these steps:

## 1. Set `jsx` field in your `tsconfig.json` to `react`

```js
{
  "compilerOptions": {
    "jsx": "react"
    ...
  }
}
```

## 2. Install `@types/react` as a `devDependency`

```SH
npm i -D @types/react 
# or
yarn add -D @types/react
```

## 3. Import `React` from Aureolin in all of your `.tsx` files

```tsx
import { React } from 'aureolin'
```

Now you can use JSX for responding to the requests

## Example

```TSX
/** @filename HomeController.tsx */
import { React, Controller, Get } from 'aureolin'

@Controller('/')
export class HomeController {
  @Get('/')
  async index() {
    return (
        <div>
            <h1>Hello, world!</h1>
        </div>
        )
    )
  }
}
```

