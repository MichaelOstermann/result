import type { Result } from "."
import type { InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { ResultError } from "../ResultError"

/**
 * Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with a default message.
 *
 * @example
 * ```ts
 * // data-first
 * Result.unwrap(ok(5));
 * // 5
 *
 * Result.unwrap(err("fail"));
 * // throws ResultError("Called Err.unwrap()")
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(ok(5), Result.unwrap());
 * // 5
 * ```
 */
export const unwrap: {
    <T extends Result>(): (result: T) => InferOk<T>
    <T extends Result>(result: T): InferOk<T>
} = dfdlT((result: Result): any => {
    if (result.ok) return result.value
    throw new ResultError("Called Err.unwrap()", result.error)
}, 1)
