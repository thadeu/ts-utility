export class TryException extends Error {
  statusCode: number

  constructor(message: string, statusCode?: number) {
    super(message)

    this.name = 'TryException'
    this.statusCode = statusCode || 400

    Error.captureStackTrace(this, this.constructor)
  }
}
