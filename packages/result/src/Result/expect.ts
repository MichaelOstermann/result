import type { Result } from "."
import type { InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { ResultError } from "../ResultError"

/**
 * # expect
 *
 * ```ts
 * function Result.expect(result: Result<T, E>, message: string): T
 * ```
 *
 * Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with the given `message`.
 *
 * ## Example
 *
 * ```ts [data-first]
 * Result.expect(ok(5), "Expected a value");
 * // 5
 *
 * Result.expect(err("fail"), "Expected a value");
 * // throws ResultError("Expected a value")
 * ```
 *
 * ```ts [data-last]
 * pipe(ok(5), Result.expect("Expected a value"));
 * // 5
 * ```
 *
 */
export const expect: {
    <T extends Result>(message: string): (result: T) => InferOk<T>
    <T extends Result>(result: T, message: string): InferOk<T>
} = dfdlT((result: Result, message: string): any => {
    if (result.ok) return result.value
    throw new ResultError(message, result.error)
}, 2)
