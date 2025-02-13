<p align="center">
  <h1 align="center">🖇️ ts-utility</h1>
  <p align="center"><i>A simple and lightweight way to create a safe result in Typescript</i></p>
</p>

<p align="center">
  <img alt="Build Status" src="https://github.com/thadeu/ts-utility/actions/workflows/ci.yml/badge.svg?cacheSeconds=0">  
  <img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/thadeu/ts-utility?cacheSeconds=0">
  <img alt="GitHub repo size" src="https://img.shields.io/bundlephobia/min/%40thadeu%2Fts-utility?cacheSeconds=0">
</p>


## Motivation

Because in sometimes, we need to use safe conditions with try/catch, but we not want use blocks

## Documentation <!-- omit in toc -->

Version    | Documentation
---------- | -------------
unreleased | https://github.com/thadeu/ts-utility/blob/main/README.md

## Table of Contents <!-- omit in toc -->
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Availables Predicates](#availables-predicates)
  - [Usage](#usage)
  - [Utilities](#utilities)

## Compatibility

| kind           | branch  | javascript         |
| -------------- | ------- | ------------------ |
| unreleased     | main    | >= 14.x, <= 21.x |

## Installation

Use Yarn

```bash
yarn add @thadeu/ts-utility
```

or use NPM

```bash
npm i @thadeu/ts-utility
```

or use PNPM

```bash
pnpm add @thadeu/ts-utility
```

or use Github directly

```bash
pnpm add github:thadeu/ts-utility
```

and then, enjoy!

For example:

**Imagine that you have an class like this:**

```ts
class User {
  static async all() {
    return [{ id: 1 }, { id: 2 }]
  }

  static async throwed() {
    throw new Error(`User not found`)
  }
}
```

Now, look it.

```ts
import { Try } from '@thadeu/ts-utility'
```

or 

```ts
import { safeTry } from '@thadeu/ts-utility'
```

The difference between them, is that safeTry always returns a tupple [error, value]. Look at this.

```ts
type Data = {
  data: {
    user: {
      name: string
    }
  }
}

const obj = { data: { user: { name: 'Thadeu' } } }
const fn = () => JSON.parse(JSON.stringify(obj))
const [error, value] = safeTry<Error, Data>(fn)

expect(error).toBeNull()
expect(value).toEqual(obj)
expect(obj.data.user.name).toEqual('Thadeu')
```

And when we have an async function, like this:

```ts
const obj = { data: { user: { name: 'Thadeu' } } }

const promise = obj => async () => JSON.parse(JSON.stringify(obj))
const [error, value] = await safeTry(promise(obj))

expect(error).toBeNull()
expect(value).toEqual(obj)
```

> When success, you receive promise resolved.

```ts
 let tryOptions = {
  onError: error => {
    // console.log(error)
    return []
  },
}

let result = await Try(User.all, tryOptions)
// or
let result = await Try(_ => User.all(), tryOptions)
// result => [{ id: 1 }, { id: 2 }]
```

> When fail you receive onError callback OR null

```ts
let tryOptions = {
  onError: async error => {
    // console.log(error)
    return []
  },
}

let result = await Try(User.throwed, tryOptions)
// result => []
```

```ts
let tryOptions = {
  onError: async error => {
    // console.log(error)
    return []
  },
}

let result = await Try(async () => User.throwed(params), tryOptions)
// result => []
```

**Others examples.**

```ts
let counter = 0
let tryOptions = { max: 3, onError: {}, onRetry: (count, isReached) => (counter = count) }

await Try(_ => JSON.parse('{'), tryOptions)

expect(counter).toEqual(3)
```

```ts
let counter = 0

let tryOptions = {
  max: 3,
  onError: {},
  onRetry: count => (counter = count)
}

let result = await Try(_ => JSON.parse('{ "user": "1" }'), tryOptions)

expect(counter).toEqual(0)
expect(result).toEqual({ user: '1' })
```

**Using exponential parameter**

```ts
let result = await Try(_ => JSON.parse('{'), {
  onError: {},
  max: 3,
  exponential: 2 
})

expect(result).toEqual({})
```

## Configuration

Without configuration, because we use only JavaScript. ❤️

## Usage Try

[⬆️ &nbsp;Back to Top](#table-of-contents-)

## Development

After checking out the repo, install dependencies. Then, run `test` to run the tests.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/thadeu/ts-utility. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/thadeu/ts-utility/blob/master/CODE_OF_CONDUCT.md).


## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
