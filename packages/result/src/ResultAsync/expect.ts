import type { AwaitableResult, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { ResultError } from "../ResultError"

/**
 * Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with the given `message`.
 *
 * @example
 * ```ts
 * await ResultAsync.expect(ok(5), "Expected a value");
 * // 5
 *
 * await ResultAsync.expect(err("fail"), "Expected a value");
 * // throws ResultError("Expected a value")
 * ```
 *
 * @example
 * ```ts
 * await pipe(ok(5), ResultAsync.expect("Expected a value"));
 * // 5
 * ```
 */
export const expect: {
    <T extends AwaitableResult>(message: string): (result: T) => Promise<InferOk<T>>
    <T extends AwaitableResult>(result: T, message: string): Promise<InferOk<T>>
} = dfdlT(async (result: AwaitableResult, message: string): Promise<any> => {
    const r = await result
    if (r.ok) return r.value
    throw new ResultError(message, r.error)
}, 2)
