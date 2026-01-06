import type { AwaitableResult, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # mapOr
 *
 * ```ts
 * function ResultAsync.mapOr(
 *     result: AwaitableResult<T, E>,
 *     transform: (value: T) => U | Promise<U>,
 *     fallback: F
 * ): Promise<U | F>
 * ```
 *
 * Unwraps the Ok value using the `transform` function, or returns the `fallback` value if the result is an Err.
 *
 * ## Example
 *
 * ```ts [data-first]
 * await ResultAsync.mapOr(ok(5), (x) => x * 2, 0);
 * // 10
 *
 * await ResultAsync.mapOr(err("fail"), (x) => x * 2, 0);
 * // 0
 * ```
 *
 * ```ts [data-last]
 * await pipe(
 *     ok(5),
 *     ResultAsync.mapOr((x) => x * 2, 0),
 * );
 * // 10
 * ```
 *
 */
export const mapOr: {
    <T extends AwaitableResult, U, V>(transform: (value: InferOk<T>) => U, fallback: V): (result: T) => Promise<Awaited<U | V>>
    <T extends AwaitableResult, U, V>(result: T, transform: (value: InferOk<T>) => U, fallback: V): Promise<Awaited<U | V>>
} = dfdlT(async (result: AwaitableResult, transform: any, fallback: any): Promise<any> => {
    const r = await result
    return r.ok ? transform(r.value) : fallback
}, 3)
