import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Pattern matches on the `result` using the provided `patterns` object. Calls the `Ok` function if the result is Ok, or the `Err` function if the result is an Err.
 *
 * @example
 * ```ts
 * await ResultAsync.match(ok(5), {
 *     Ok: (x) => `Value: ${x}`,
 *     Err: (e) => `Error: ${e}`,
 * });
 * // "Value: 5"
 *
 * await ResultAsync.match(err("fail"), {
 *     Ok: (x) => `Value: ${x}`,
 *     Err: (e) => `Error: ${e}`,
 * });
 * // "Error: fail"
 * ```
 *
 * @example
 * ```ts
 * await pipe(
 *     ok(5),
 *     ResultAsync.match({
 *         Ok: (x) => `Value: ${x}`,
 *         Err: (e) => `Error: ${e}`,
 *     }),
 * );
 * // "Value: 5"
 * ```
 */
export const match: {
    <T extends AwaitableResult, A, B>(patterns: { Err: (error: InferErr<T>) => B, Ok: (value: InferOk<T>) => A }): (result: T) => Promise<Awaited<A | B>>
    <T extends AwaitableResult, A, B>(result: T, patterns: { Err: (error: InferErr<T>) => B, Ok: (value: InferOk<T>) => A }): Promise<Awaited<A | B>>
} = dfdlT(async (result: AwaitableResult, patterns: any): Promise<any> => {
    const r = await result
    return r.ok
        ? patterns.Ok(r.value)
        : patterns.Err(r.error)
}, 2)
