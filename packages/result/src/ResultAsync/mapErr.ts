import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Transforms the Err value using the `transform` function. If the result is an Err, applies the transform function to the error value and returns a new Err. If the result is Ok, returns it unchanged.
 *
 * @example
 * ```ts
 * await ResultAsync.mapErr(err("fail"), (e) => `Error: ${e}`);
 * // Err<string>("Error: fail")
 *
 * await ResultAsync.mapErr(ok(5), (e) => `Error: ${e}`);
 * // Ok<number>(5)
 * ```
 *
 * @example
 * ```ts
 * await pipe(
 *     err("fail"),
 *     ResultAsync.mapErr((e) => `Error: ${e}`),
 * );
 * // Err<string>("Error: fail")
 * ```
 */
export const mapErr: {
    <T extends AwaitableResult, U>(transform: (error: InferErr<T>) => U): (result: T) => ResultAsync<InferOk<T>, Awaited<U>>
    <T extends AwaitableResult, U>(result: T, transform: (error: InferErr<T>) => U): ResultAsync<InferOk<T>, Awaited<U>>
} = dfdlT(async (result: AwaitableResult, transform: any): Promise<any> => {
    const r = await result
    return !r.ok ? { error: await transform(r.error), ok: false } : r
}, 2)
