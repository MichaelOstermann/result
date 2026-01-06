import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # mapOrElse
 *
 * ```ts
 * function ResultAsync.mapOrElse(
 *     result: AwaitableResult<T, E>,
 *     transform: (value: T) => U | Promise<U>,
 *     orElse: (error: E) => F | Promise<F>
 * ): Promise<U | F>
 * ```
 *
 * Unwraps the Ok value using the `transform` function, or transforms the Err value using the `orElse` function.
 *
 * ## Example
 *
 * ```ts [data-first]
 * await ResultAsync.mapOrElse(
 *     ok(5),
 *     (x) => x * 2,
 *     (e) => `Error: ${e}`,
 * );
 * // 10
 *
 * await ResultAsync.mapOrElse(
 *     err("fail"),
 *     (x) => x * 2,
 *     (e) => `Error: ${e}`,
 * );
 * // "Error: fail"
 * ```
 *
 * ```ts [data-last]
 * await pipe(
 *     ok(5),
 *     ResultAsync.mapOrElse(
 *         (x) => x * 2,
 *         (e) => `Error: ${e}`,
 *     ),
 * );
 * // 10
 * ```
 *
 */
export const mapOrElse: {
    <T extends AwaitableResult, U, V>(transform: (value: InferOk<T>) => U, orElse: (error: InferErr<T>) => V): (result: T) => Promise<Awaited<U | V>>
    <T extends AwaitableResult, U, V>(result: T, transform: (value: InferOk<T>) => U, orElse: (error: InferErr<T>) => V): Promise<Awaited<U | V>>
} = dfdlT(async (result: AwaitableResult, transform: any, orElse: any): Promise<any> => {
    const r = await result
    return r.ok ? transform(r.value) : orElse(r.error)
}, 3)
