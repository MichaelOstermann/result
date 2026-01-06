import type { Result } from "."
import type { InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # mapOr
 *
 * ```ts
 * function Result.mapOr(
 *     result: Result<T, E>,
 *     transform: (value: T) => U,
 *     fallback: F
 * ): U | F
 * ```
 *
 * Unwraps the Ok value using the `transform` function, or returns the `fallback` value if the result is an Err.
 *
 * ## Example
 *
 * ```ts [data-first]
 * Result.mapOr(ok(5), (x) => x * 2, 0);
 * // 10
 *
 * Result.mapOr(err("fail"), (x) => x * 2, 0);
 * // 0
 * ```
 *
 * ```ts [data-last]
 * pipe(
 *     ok(5),
 *     Result.mapOr((x) => x * 2, 0),
 * );
 * // 10
 * ```
 *
 */
export const mapOr: {
    <T extends Result, U, V>(transform: (value: InferOk<T>) => U, fallback: V): (result: T) => U | V
    <T extends Result, U, V>(result: T, transform: (value: InferOk<T>) => U, fallback: V): U | V
} = dfdlT((result: Result, transform: any, fallback: any): any => {
    return result.ok ? transform(result.value) : fallback
}, 3)
