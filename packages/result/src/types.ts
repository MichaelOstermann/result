import type { Err, Ok, Result } from "./Result/types"
import type { ErrAsync, OkAsync, ResultAsync } from "./ResultAsync/types"

export type AwaitableResult<T = unknown, E = unknown> = Result<T, E> | OkAsync<T> | ErrAsync<E> | ResultAsync<T, E>

export type InferOk<T> =
    T extends Promise<infer R>
        ? R extends Ok<infer U> ? U
            : never
        : T extends Ok<infer U> ? U
            : never

export type InferErr<T> =
    T extends Promise<infer R>
        ? R extends Err<infer E> ? E
            : never
        : T extends Err<infer E> ? E
            : never
