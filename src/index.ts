import { TryException } from '@/Exception'
import { execute, delay, race, isFunction, isAsyncFunction, isPlainString, isPlainRegex } from '@/Util'

export { delay, race, isAsyncFunction, isFunction, isPlainString, isPlainRegex, execute as Execute }

interface TryOptions {
  max?: number
  exponential?: number
  count?: number
  strict?: boolean
  timeout?: number
  onError?: any
  async?: boolean
  onRetry?: (count: number, isReached: boolean) => void
}

export function Try(callable: any, options?: TryOptions) {
  const max = options?.max ?? 0
  const isAsync = options?.async ?? isAsyncFunction(callable)
  let count = options?.count ?? 0

  try {
    if (isAsync) {
      return race(options?.timeout ?? 9_999, execute(callable)).catch(e => {
        if (count >= max) {
          return options?.onError ? execute(options?.onError, e) : e
        }
        
        count++
        
        if (options?.onRetry) options.onRetry(count, count >= max)
          
          if (max > 0) {
          return (async function () {
            await delay((count ** (options?.exponential ?? 0.5)) * 1_000)
            return Try(callable, { ...options, count })
          })()
        }

        return Try(callable, { ...options, count })
      })
    }

    if (isFunction(callable)) {
      return execute(callable)
    }

    return execute(callable)
  } catch (error) {
    if (count >= max) {
      if (options?.strict) {
        throw new TryException(error)
      } else {
        return execute(options?.onError, error)
      }
    }

    count++

    if (options?.onRetry) options.onRetry(count, count >= max)

    if (max > 0) {
      return (async function () {
        await delay((count ** (options?.exponential ?? 0.5)) * 1_000)
        return Try(callable, { ...options, count })
      })()
    }

    return Try(callable, { ...options, count })
  }
}
