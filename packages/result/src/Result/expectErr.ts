import type { Result } from "."
import type { InferErr } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { ResultError } from "../ResultError"

/**
 * Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with the given `message`.
 *
 * @example
 * ```ts
 * // data-first
 * Result.expectErr(err("fail"), "Expected an error");
 * // "fail"
 *
 * Result.expectErr(ok(5), "Expected an error");
 * // throws ResultError("Expected an error")
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(err("fail"), Result.expectErr("Expected an error"));
 * // "fail"
 * ```
 */
export const expectErr: {
    <T extends Result>(message: string): (result: T) => InferErr<T>
    <T extends Result>(result: T, message: string): InferErr<T>
} = dfdlT((result: Result, message: string): any => {
    if (!result.ok) return result.error
    throw new ResultError(message, result.value)
}, 2)
