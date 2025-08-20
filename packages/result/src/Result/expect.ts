import type { InferOk } from "../types"
import type { Result } from "./types"
import { dfdlT } from "@monstermann/dfdl"
import { ResultError } from "../ResultError"

/**
 * Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with the given `message`.
 *
 * @example
 * ```ts
 * // data-first
 * Result.expect(ok(5), "Expected a value");
 * // 5
 *
 * Result.expect(err("fail"), "Expected a value");
 * // throws ResultError("Expected a value")
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(ok(5), Result.expect("Expected a value"));
 * // 5
 * ```
 */
export const expect: {
    <T extends Result>(message: string): (result: T) => InferOk<T>
    <T extends Result>(result: T, message: string): InferOk<T>
} = dfdlT((result: Result, message: string): any => {
    if (result.ok) return result.value
    throw new ResultError(message, result.error)
}, 2)
