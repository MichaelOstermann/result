import type { AwaitableResult, InferErr } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { ResultError } from "../ResultError"

/**
 * # expectErr
 *
 * ```ts
 * function ResultAsync.expectErr(
 *     result: AwaitableResult<T, E>,
 *     message: string
 * ): Promise<E>
 * ```
 *
 * Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with the given `message`.
 *
 * ## Example
 *
 * ```ts [data-first]
 * await ResultAsync.expectErr(err("fail"), "Expected an error");
 * // "fail"
 *
 * await ResultAsync.expectErr(ok(5), "Expected an error");
 * // throws ResultError("Expected an error")
 * ```
 *
 * ```ts [data-last]
 * await pipe(err("fail"), ResultAsync.expectErr("Expected an error"));
 * // "fail"
 * ```
 *
 */
export const expectErr: {
    <T extends AwaitableResult>(message: string): (result: T) => Promise<InferErr<T>>
    <T extends AwaitableResult>(result: T, message: string): Promise<InferErr<T>>
} = dfdlT(async (result: AwaitableResult, message: string): Promise<any> => {
    const r = await result
    if (!r.ok) return r.error
    throw new ResultError(message, r.value)
}, 2)
