import type { Err, Ok } from "../Result/types"

export type OkAsync<T = unknown> = Promise<Ok<T>>
export type ErrAsync<T = unknown> = Promise<Err<T>>
export type ResultAsync<T = unknown, E = unknown> = Promise<Ok<T> | Err<E>>
