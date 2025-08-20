import type { AwaitableResult, InferErr } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { ResultError } from "../ResultError"

/**
 * Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with a default message.
 *
 * @example
 * ```ts
 * await ResultAsync.unwrapErr(err("fail"));
 * // "fail"
 *
 * await ResultAsync.unwrapErr(ok(5));
 * // throws ResultError("Called Ok.unwrapErr()")
 * ```
 *
 * @example
 * ```ts
 * await pipe(err("fail"), ResultAsync.unwrapErr());
 * // "fail"
 * ```
 */
export const unwrapErr: {
    <T extends AwaitableResult>(): (result: T) => Promise<InferErr<T>>
    <T extends AwaitableResult>(result: T): Promise<InferErr<T>>
} = dfdlT(async (result: AwaitableResult): Promise<any> => {
    const r = await result
    if (!r.ok) return r.error
    throw new ResultError("Called OkAsync.unwrapErr()", r.value)
}, 1)
