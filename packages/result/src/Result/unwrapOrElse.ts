import type { Result } from "."
import type { InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # unwrapOrElse
 *
 * ```ts
 * function Result.unwrapOrElse(
 *     result: Result<T, E>,
 *     orElse: (error: E) => U
 * ): T | U
 * ```
 *
 * Unwraps the Ok value from the `result`, or computes a fallback value using `orElse` if the result is an Err.
 *
 * ## Example
 *
 * ```ts [data-first]
 * Result.unwrapOrElse(ok(5), (e) => 0);
 * // 5
 *
 * Result.unwrapOrElse(err("fail"), (e) => `Default for ${e}`);
 * // "Default for fail"
 * ```
 *
 * ```ts [data-last]
 * pipe(
 *     err("fail"),
 *     Result.unwrapOrElse((e) => `Default for ${e}`),
 * );
 * // "Default for fail"
 * ```
 *
 */
export const unwrapOrElse: {
    <T extends Result, U>(orElse: (error: InferErr<T>) => U): (result: T) => InferOk<T> | U
    <T extends Result, U>(result: T, orElse: (error: InferErr<T>) => U): InferOk<T> | U
} = dfdlT((result: Result, orElse: any): any => {
    return result.ok ? result.value : orElse(result.error)
}, 2)
