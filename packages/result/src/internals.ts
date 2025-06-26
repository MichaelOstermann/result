import type { Err, ErrP, InferErr, InferOk, Ok, OkP, Result, ResultP } from "./types"

export type SimplifyResultSync<T> = [InferOk<T>] extends [never]
    ? [InferErr<T>] extends [never]
            ? never
            : Err<InferErr<T>>
    : [InferErr<T>] extends [never]
            ? Ok<InferOk<T>>
            : Result<InferOk<T>, InferErr<T>>

export type SimplifyResultAsync<T> = [InferOk<T>] extends [never]
    ? [InferErr<T>] extends [never]
            ? never
            : ErrP<InferErr<T>>
    : [InferErr<T>] extends [never]
            ? OkP<InferOk<T>>
            : ResultP<InferOk<T>, InferErr<T>>

export function mapP<T, U>(value: T | Promise<T>, fn: (value: T) => U): U | Promise<U> {
    return value instanceof Promise
        ? value.then(fn)
        : fn(value)
}

export function isP(value: unknown): value is Promise<unknown> {
    return value instanceof Promise
}
