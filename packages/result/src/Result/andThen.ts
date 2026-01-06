import type { Result } from "."
import type { InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # andThen
 *
 * ```ts
 * function Result.andThen(
 *     result: Result<T, E>,
 *     transform: (value: T) => Result<U, F>
 * ): Result<U, E | F>
 * ```
 *
 * Chains Result-returning operations. If the `result` is Ok, applies the `transform` function to its value. If the `result` is Err, returns the Err unchanged.
 *
 * ## Example
 *
 * ```ts [data-first]
 * Result.andThen(ok(5), (x) => ok(x * 2));
 * // Ok<number>
 *
 * Result.andThen(err("fail"), (x) => ok(x * 2));
 * // Err<string>
 * ```
 *
 * ```ts [data-last]
 * pipe(
 *     ok(5),
 *     Result.andThen((x) => ok(x * 2)),
 * );
 * // Ok<number>
 * ```
 *
 */
export const andThen: {
    <T extends Result, U extends Result>(
        transform: (value: InferOk<T>) => U
    ): (result: T) => Result<InferOk<U>, InferErr<T> | InferErr<U>>

    <T extends Result, U extends Result>(
        result: T,
        transform: (value: InferOk<T>) => U
    ): Result<InferOk<U>, InferErr<T> | InferErr<U>>
} = dfdlT((result: Result, transform: any): any => {
    return result.ok ? transform(result.value) : result
}, 2)
