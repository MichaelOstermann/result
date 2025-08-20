export interface Ok<T = unknown> {
    readonly ok: true
    readonly value: T
}

export interface Err<T = unknown> {
    readonly error: T
    readonly ok: false
}

export type Result<T = unknown, E = unknown> = Ok<T> | Err<E>
