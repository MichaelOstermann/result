import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Unwraps the Ok value from the `result`, or computes a fallback value using `orElse` if the result is an Err.
 *
 * @example
 * ```ts
 * await ResultAsync.unwrapOrElse(ok(5), (e) => 0);
 * // 5
 *
 * await ResultAsync.unwrapOrElse(err("fail"), (e) => `Default for ${e}`);
 * // "Default for fail"
 * ```
 *
 * @example
 * ```ts
 * await pipe(
 *     err("fail"),
 *     ResultAsync.unwrapOrElse((e) => `Default for ${e}`),
 * );
 * // "Default for fail"
 * ```
 */
export const unwrapOrElse: {
    <T extends AwaitableResult, U>(orElse: (error: InferErr<T>) => U): (result: T) => Promise<Awaited<InferOk<T> | U>>
    <T extends AwaitableResult, U>(result: T, orElse: (error: InferErr<T>) => U): Promise<Awaited<InferOk<T> | U>>
} = dfdlT(async (result: AwaitableResult, orElse: any): Promise<any> => {
    const r = await result
    return r.ok ? r.value : orElse(r.error)
}, 2)
