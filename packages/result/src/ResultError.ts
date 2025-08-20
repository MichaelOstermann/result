export class ResultError extends Error {
    data: unknown

    constructor(message: string, data: unknown) {
        super(message)
        this.data = data
    }

    static is(value: unknown): value is ResultError {
        return value instanceof ResultError
    }
}
