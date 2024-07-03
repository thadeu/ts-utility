import { describe, it, expect } from 'vitest'
import { Try } from '../src'

class User {
  static async all() {
    return [{ id: 1 }, { id: 2 }]
  }

  static async throwed() {
    throw new Error(`User not found`)
  }
}

describe('Try', () => {
  it('sync single value', () => {
    let value = Try(1)

    expect(value).toBe(1)
  })

  it('case value is async', async () => {
    let promise = () => JSON.parse('{')
    let value = await Try(promise, { max: 2, onError: {} })

    expect(value).toEqual({})
  })

  it('case value is async flag', async () => {
    let value = await Try(() => JSON.parse('{ "a": 1 }'), { async: true, onError: {} })

    expect(value).toEqual({ a: 1 })
  })

  it('case value isnt async', async () => {
    let promise = () => JSON.parse('{')
    let value = Try(promise, { onError: {} })

    expect(value).toEqual({})
  })

  it('case value isnt function', async () => {
    let value = await Try(_ => JSON.parse('{'), { onError: {} })

    expect(value).toEqual({})
  })

  it('case exponential configured', async () => {
    let result = await Try(_ => JSON.parse('{'), { onError: {}, max: 1, exponential: 1.6 })

    expect(result).toEqual({})
  })

  it('onRetry', async () => {
    let counter = 0

    await Try(_ => JSON.parse('{'), { max: 2, onError: {}, onRetry: (count, isReached) => (counter = count) })

    expect(counter).toEqual(2)
  })

  it('case success #1', async () => {
    let counter = 0

    let tryOptions = { max: 3, onError: {}, onRetry: count => (counter = count) }
    let result = await Try(_ => JSON.parse('{ "user": "1" }'), tryOptions)

    expect(counter).toEqual(0)
    expect(result).toEqual({ user: '1' })
  })

  it('case success #2', () => {
    let tryOptions = { max: 1, onError: {} }
    let result = Try(_ => JSON.parse('{ "user": "1" }'), tryOptions)

    expect(result).toEqual({ user: '1' })
  })

  it('case success #2', () => {
    let tryOptions = { max: 1, onError: {} }
    let result = Try(_ => JSON.parse('{ "user": "1" }'), tryOptions)

    expect(result).toEqual({ user: '1' })
  })

  it('case success #2', async () => {
    let tryOptions = {
      onError: error => {
        // console.log(error)
        return []
      },
    }

    let result = await Try(_ => User.all(), tryOptions)

    expect(result).toEqual([{ id: 1 }, { id: 2 }])
  })

  it('case fail with throw', async () => {
    let tryOptions = {
      onError: async error => {
        // console.log(error)
        return []
      },
    }

    let result = await Try(async () => User.throwed(), tryOptions)

    expect(result).toEqual([])
  })

  it('case fail with throw', async () => {
    let tryOptions = {
      onError: async error => {
        // console.log(error)
        return []
      },
    }

    let result = await Try(User.throwed, tryOptions)

    expect(result).toEqual([])
  })

  it('execute eval code', async () => {
    let tryOptions = {
      onError: async error => {
        return []
      },
    }

    const code = eval(`
      () => {
        return Number(1)
      }
    `)

    let result = await Try(code, tryOptions)

    expect(result).toEqual(1)
  })

  it('resolved promise', async () => {
    let tryOptions = {
      max: 3,
      timeout: 5_000,
      exponential: 1.5,
      onRetry: (count, isReached) => [count, isReached],
      onError: (err) => err
    }

    let adapter = {
      post: async ({ path, body }) => {
        return Promise.reject({ statusCode: 429 })
      }
    }

    const promise = async () => {
      let httpVerb = adapter['post']

      return httpVerb({ path: 'test', body: {} })
    }

    let result = await Try(promise, tryOptions)
    console.log(result)
  })
})
