import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # map
 *
 * ```ts
 * function ResultAsync.map(
 *     result: AwaitableResult<T, E>,
 *     transform: (value: T) => U | Promise<U>
 * ): ResultAsync<U, E>
 * ```
 *
 * Transforms the value inside an Ok result using the `transform` function. If the `result` is an Err, it returns the Err unchanged.
 *
 * ## Example
 *
 * ```ts [data-first]
 * await ResultAsync.map(ok(5), (x) => x * 2);
 * // Ok<number>
 *
 * await ResultAsync.map(err("fail"), (x) => x * 2);
 * // Err<string>
 * ```
 *
 * ```ts [data-last]
 * await pipe(
 *     ok(5),
 *     ResultAsync.map((x) => x * 2),
 * );
 * // Ok<number>
 * ```
 *
 */
export const map: {
    <T extends AwaitableResult, U>(transform: (value: InferOk<T>) => U): (result: T) => ResultAsync<Awaited<U>, InferErr<T>>
    <T extends AwaitableResult, U>(result: T, transform: (value: InferOk<T>) => U): ResultAsync<Awaited<U>, InferErr<T>>
} = dfdlT(async (result: AwaitableResult, transform: any): Promise<any> => {
    const r = await result
    return r.ok ? { ok: true, value: await transform(r.value) } : r
}, 2)
