import type { AwaitableResult, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Unwraps the Ok value from the `result`, or returns the `or` value if the result is an Err.
 *
 * @example
 * ```ts
 * await ResultAsync.unwrapOr(ok(5), 0);
 * // 5
 *
 * await ResultAsync.unwrapOr(err("fail"), 0);
 * // 0
 * ```
 *
 * @example
 * ```ts
 * await pipe(err("fail"), ResultAsync.unwrapOr(0));
 * // 0
 * ```
 */
export const unwrapOr: {
    <T extends AwaitableResult, U>(or: U): (result: T) => Promise<Awaited<InferOk<T> | U>>
    <T extends AwaitableResult, U>(result: T, or: U): Promise<Awaited<InferOk<T> | U>>
} = dfdlT(async (result: AwaitableResult, or: any): Promise<any> => {
    const r = await result
    if (r.ok) return r.value
    return or
}, 2)
