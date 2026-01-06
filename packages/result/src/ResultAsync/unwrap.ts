import type { AwaitableResult, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { ResultError } from "../ResultError"

/**
 * # unwrap
 *
 * ```ts
 * function ResultAsync.unwrap(
 *     result: AwaitableResult<T, E>
 * ): Promise<T>
 * ```
 *
 * Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with a default message.
 *
 * ## Example
 *
 * ```ts [data-first]
 * await ResultAsync.unwrap(ok(5));
 * // 5
 *
 * await ResultAsync.unwrap(err("fail"));
 * // throws ResultError("Called Err.unwrap()")
 * ```
 *
 * ```ts [data-last]
 * await pipe(ok(5), ResultAsync.unwrap());
 * // 5
 * ```
 *
 */
export const unwrap: {
    <T extends AwaitableResult>(): (result: T) => Promise<InferOk<T>>
    <T extends AwaitableResult>(result: T): Promise<InferOk<T>>
} = dfdlT(async (result: AwaitableResult): Promise<any> => {
    const r = await result
    if (r.ok) return r.value
    throw new ResultError("Called ErrAsync.unwrap()", r.error)
}, 1)
