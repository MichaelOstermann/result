import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # unwrapOrElse
 *
 * ```ts
 * function ResultAsync.unwrapOrElse(
 *     result: AwaitableResult<T, E>,
 *     orElse: (error: E) => U | Promise<U>
 * ): Promise<T | U>
 * ```
 *
 * Unwraps the Ok value from the `result`, or computes a fallback value using `orElse` if the result is an Err.
 *
 * ## Example
 *
 * ```ts [data-first]
 * await ResultAsync.unwrapOrElse(ok(5), (e) => 0);
 * // 5
 *
 * await ResultAsync.unwrapOrElse(err("fail"), (e) => `Default for ${e}`);
 * // "Default for fail"
 * ```
 *
 * ```ts [data-last]
 * await pipe(
 *     err("fail"),
 *     ResultAsync.unwrapOrElse((e) => `Default for ${e}`),
 * );
 * // "Default for fail"
 * ```
 *
 */
export const unwrapOrElse: {
    <T extends AwaitableResult, U>(orElse: (error: InferErr<T>) => U): (result: T) => Promise<Awaited<InferOk<T> | U>>
    <T extends AwaitableResult, U>(result: T, orElse: (error: InferErr<T>) => U): Promise<Awaited<InferOk<T> | U>>
} = dfdlT(async (result: AwaitableResult, orElse: any): Promise<any> => {
    const r = await result
    return r.ok ? r.value : orElse(r.error)
}, 2)
