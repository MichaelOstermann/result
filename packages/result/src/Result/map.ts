import type { Result } from "."
import type { InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # map
 *
 * ```ts
 * function Result.map(
 *     result: Result<T, E>,
 *     transform: (value: T) => U
 * ): Result<U, E>
 * ```
 *
 * Transforms the value inside an Ok result using the `transform` function. If the `result` is an Err, it returns the Err unchanged.
 *
 * ## Example
 *
 * ```ts [data-first]
 * Result.map(ok(5), (x) => x * 2);
 * // Ok<number>
 *
 * Result.map(err("fail"), (x) => x * 2);
 * // Err<string>
 * ```
 *
 * ```ts [data-last]
 * pipe(
 *     ok(5),
 *     Result.map((x) => x * 2),
 * );
 * // Ok<number>
 * ```
 *
 */
export const map: {
    <T extends Result, U>(transform: (value: InferOk<T>) => U): (result: T) => Result<U, InferErr<T>>
    <T extends Result, U>(result: T, transform: (value: InferOk<T>) => U): Result<U, InferErr<T>>
} = dfdlT((result: Result, transform: any): any => {
    return result.ok ? { ok: true, value: transform(result.value) } : result
}, 2)
