export const isFunction = fn => fn?.constructor?.name === 'Function'
export const isAsyncFunction = fn => fn?.constructor?.name === 'AsyncFunction'

export const execute = (o, params = null) => {
  if (isAsyncFunction(o)) {
    return o(params)
  }

  if (isFunction(o)) {
    return o(params)
  }

  return (() => o)()
}

export const delay = ms => new Promise((resolve, reject) => setTimeout(resolve, ms))

export const race = (milliseconds, ...promises) => {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => reject(`limit time excedded (${milliseconds} ms)`), milliseconds)
  })

  return Promise.race([timeout, ...promises])
}
