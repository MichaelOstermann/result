import type { SimplifyResultAsync, SimplifyResultSync } from "./internals"

/**
 * Represents a synchronous error.
 *
 * ```ts
 * import type { Err } from "@monstermann/result";
 *
 * type Example = Err<boolean>;
 *
 * // type Example = {
 * //     readonly ok: false
 * //     readonly value?: undefined
 * //     readonly error: boolean
 * // }
 * ```
 */
export interface Err<T = unknown> {
    readonly error: T
    readonly ok: false
    readonly value?: undefined
}

/**
 * Represents a synchronous success.
 *
 * ```ts
 * import type { Ok } from "@monstermann/result";
 *
 * type Example = Ok<boolean>;
 *
 * // type Example = {
 * //     readonly ok: true
 * //     readonly value: boolean
 * //     readonly error?: undefined
 * // }
 * ```
 */
export interface Ok<T = unknown> {
    readonly error?: undefined
    readonly ok: true
    readonly value: T
}

/**
 * Represents a synchronous success or error.
 *
 * ```ts
 * import type { Result } from "@monstermann/result";
 *
 * type Example = Result<boolean, string>;
 * // type Example = Ok<boolean> | Err<string>;
 * ```
 */
export type Result<T = unknown, E = unknown> = Ok<T> | Err<E>

/**
 * Represents an asynchronous error.
 *
 * ```ts
 * import type { ErrP } from "@monstermann/result";
 *
 * type Example = ErrP<boolean>;
 *
 * // type Example = Promise<{
 * //     readonly ok: false
 * //     readonly value?: undefined
 * //     readonly error: boolean
 * // }>
 * ```
 */
export type ErrP<T = unknown> = Promise<Err<T>>

/**
 * Represents an asynchronous success.
 *
 * ```ts
 * import type { OkP } from "@monstermann/result";
 *
 * type Example = OkP<boolean>;
 *
 * // type Example = Promise<{
 * //     readonly ok: true
 * //     readonly value: boolean
 * //     readonly error?: undefined
 * // }>
 * ```
 */
export type OkP<T = unknown> = Promise<Ok<T>>

/**
 * Represents an asynchronous success or error.
 *
 * ```ts
 * import type { ResultP } from "@monstermann/result";
 *
 * type Example = ResultP<boolean, string>;
 * // type Example = OkP<boolean> | ErrP<string>;
 * ```
 */
export type ResultP<T = unknown, E = unknown> = Promise<Result<T, E>>

/**
 * Represents a success that is either synchronous or asynchronous.
 *
 * ```ts
 * import type { OkLike } from "@monstermann/result";
 *
 * type Example = OkLike<boolean, string>;
 * // type Example = Ok<string> | OkP<string>;
 * ```
 */
export type OkLike<T = unknown> = Ok<T> | OkP<T>

/**
 * Represents an error that is either synchronous or asynchronous.
 *
 * ```ts
 * import type { ErrLike } from "@monstermann/result";
 *
 * type Example = ErrLike<boolean, string>;
 * // type Example = Err<string> | ErrP<string>;
 * ```
 */
export type ErrLike<T = unknown> = Err<T> | ErrP<T>

/**
 * Represents a success or error that is either synchronous or asynchronous.
 *
 * ```ts
 * import type { ResultLike } from "@monstermann/result";
 *
 * type Example = ResultLike<boolean, string>;
 * // type Example = Result<boolean, string> | ResultP<boolean, string>;
 * ```
 */
export type ResultLike<T = unknown, E = unknown> = Result<T, E> | ResultP<T, E>

/**
 * Extracts `Ok` values from any combination of results, including asynchronous ones:
 *
 * ```ts
 * import type { InferOk, Result, Ok } from "@monstermann/result";
 *
 * // boolean | string
 * type Example = InferOk<Ok<boolean> | Result<string, string>>;
 * ```
 */
export type InferOk<T> = T extends unknown
    ? T extends Promise<infer U>
        ? InferOk<U>
        : T extends Ok<infer U>
            ? U
            : never
    : never

/**
 * Extracts `Err` values from any combination of results, including asynchronous ones:
 *
 * ```ts
 * import type { InferErr, Result, Err } from "@monstermann/result";
 *
 * // boolean | string
 * type Example = InferErr<Err<boolean> | Result<string, string>>;
 * ```
 */
export type InferErr<T> = T extends unknown
    ? T extends Promise<infer U>
        ? InferErr<U>
        : T extends Err<infer U>
            ? U
            : never
    : never

/**
 * Takes any combination of `Result` types and simplifies its representation.
 *
 * ```ts
 * import type { SimplifyResult, Ok, Err, Result } from "@monstermann/result";
 *
 * // Ok<boolean>
 * type A = SimplifyResult<Result<boolean, never>>;
 *
 * // Err<boolean>
 * type B = SimplifyResult<Result<never, boolean>>;
 *
 * // Result<boolean | number, string | void>
 * type C = SimplifyResult<
 *     Ok<true> | Ok<false> | Ok<number> | Err<string> | Err<void>
 * >;
 * ```
 */
export type SimplifyResult<T> =
    | SimplifyResultSync<Extract<T, Result>>
    | SimplifyResultAsync<Extract<T, ResultP>>
    | Exclude<T, ResultLike>
