import type { Result } from "."
import type { InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # unwrapOr
 *
 * ```ts
 * function Result.unwrapOr(result: Result<T, E>, or: U): T | U
 * ```
 *
 * Unwraps the Ok value from the `result`, or returns the `or` value if the result is an Err.
 *
 * ## Example
 *
 * ```ts [data-first]
 * Result.unwrapOr(ok(5), 0);
 * // 5
 *
 * Result.unwrapOr(err("fail"), 0);
 * // 0
 * ```
 *
 * ```ts [data-last]
 * pipe(err("fail"), Result.unwrapOr(0));
 * // 0
 * ```
 *
 */
export const unwrapOr: {
    <T extends Result, U>(or: U): (result: T) => InferOk<T> | U
    <T extends Result, U>(result: T, or: U): InferOk<T> | U
} = dfdlT((result: Result, or: any): any => {
    return result.ok ? result.value : or
}, 2)
