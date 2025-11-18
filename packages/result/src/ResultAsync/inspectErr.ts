import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Inspects the Err value using the `inspect` function without changing the result. If the result is an Err, calls the inspect function with the error value and returns the original result unchanged. If the result is Ok, returns it unchanged without calling inspect.
 *
 * @example
 * ```ts
 * await ResultAsync.inspectErr(err("fail"), (e) => console.log(`Error: ${e}`));
 * // Err<string>("fail") - logs "Error: fail"
 *
 * await ResultAsync.inspectErr(ok(5), (e) => console.log(`Error: ${e}`));
 * // Ok<number>(5) - no log
 * ```
 *
 * @example
 * ```ts
 * await pipe(
 *     err("fail"),
 *     ResultAsync.inspectErr((e) => console.log(`Error: ${e}`)),
 * );
 * // Err<string>("fail") - logs "Error: fail"
 * ```
 */
export const inspectErr: {
    <T extends AwaitableResult>(inspect: (error: InferErr<T>) => void): (result: T) => ResultAsync<InferOk<T>, InferErr<T>>
    <T extends AwaitableResult>(result: T, inspect: (error: InferErr<T>) => void): ResultAsync<InferOk<T>, InferErr<T>>
} = dfdlT(async (result: AwaitableResult, inspect: any): Promise<any> => {
    const r = await result
    if (!r.ok) inspect(r.error)
    return r
}, 2)
