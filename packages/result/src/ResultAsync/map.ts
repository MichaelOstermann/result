import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Transforms the value inside an Ok result using the `transform` function. If the `result` is an Err, it returns the Err unchanged.
 *
 * @example
 * ```ts
 * await ResultAsync.map(ok(5), (x) => x * 2);
 * // Ok<number>
 *
 * await ResultAsync.map(err("fail"), (x) => x * 2);
 * // Err<string>
 * ```
 *
 * @example
 * ```ts
 * await pipe(
 *     ok(5),
 *     ResultAsync.map((x) => x * 2),
 * );
 * // Ok<number>
 * ```
 */
export const map: {
    <T extends AwaitableResult, U>(transform: (value: InferOk<T>) => U): (result: T) => ResultAsync<Awaited<U>, InferErr<T>>
    <T extends AwaitableResult, U>(result: T, transform: (value: InferOk<T>) => U): ResultAsync<Awaited<U>, InferErr<T>>
} = dfdlT(async (result: AwaitableResult, transform: any): Promise<any> => {
    const r = await result
    return r.ok ? { ok: true, value: await transform(r.value) } : r
}, 2)
