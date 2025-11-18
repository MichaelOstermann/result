import type { Result } from "."
import type { InferErr } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { ResultError } from "../ResultError"

/**
 * Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with a default message.
 *
 * @example
 * ```ts
 * // data-first
 * Result.unwrapErr(err("fail"));
 * // "fail"
 *
 * Result.unwrapErr(ok(5));
 * // throws ResultError("Called Ok.unwrapErr()")
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(err("fail"), Result.unwrapErr());
 * // "fail"
 * ```
 */
export const unwrapErr: {
    <T extends Result>(): (result: T) => InferErr<T>
    <T extends Result>(result: T): InferErr<T>
} = dfdlT((result: Result): any => {
    if (!result.ok) return result.error
    throw new ResultError("Called Ok.unwrapErr()", result.value)
}, 1)
