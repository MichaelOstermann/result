import type { Err, Ok } from "./Result/types"
import type { ErrAsync, OkAsync } from "./ResultAsync/types"

export type AwaitableOk<T = unknown> = Ok<T> | OkAsync<T>
export type AwaitableErr<T = unknown> = Err<T> | ErrAsync<T>
export type AwaitableResult<T = unknown, E = unknown> = AwaitableOk<T> | AwaitableErr<E>

export type InferOk<T> = T extends OkAsync<infer U> ? U : T extends Ok<infer U> ? U : never
export type InferErr<T> = T extends ErrAsync<infer U> ? U : T extends Err<infer U> ? U : never
