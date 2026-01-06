import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # inspect
 *
 * ```ts
 * function ResultAsync.inspect(
 *     result: AwaitableResult<T, E>,
 *     inspect: (value: T) => void
 * ): ResultAsync<T, E>
 * ```
 *
 * Inspects the Ok value using the `inspect` function without changing the result. If the result is Ok, calls the inspect function with the value and returns the original result unchanged. If the result is an Err, returns it unchanged without calling inspect.
 *
 * ## Example
 *
 * ```ts [data-first]
 * await ResultAsync.inspect(ok(5), (x) => console.log(`Value: ${x}`));
 * // Ok<number>(5) - logs "Value: 5"
 *
 * await ResultAsync.inspect(err("fail"), (x) => console.log(`Value: ${x}`));
 * // Err<string>("fail") - no log
 * ```
 *
 * ```ts [data-last]
 * await pipe(
 *     ok(5),
 *     ResultAsync.inspect((x) => console.log(`Value: ${x}`)),
 * );
 * // Ok<number>(5) - logs "Value: 5"
 * ```
 *
 */
export const inspect: {
    <T extends AwaitableResult>(inspect: (value: InferOk<T>) => void): (result: T) => ResultAsync<InferOk<T>, InferErr<T>>
    <T extends AwaitableResult>(result: T, inspect: (value: InferOk<T>) => void): ResultAsync<InferOk<T>, InferErr<T>>
} = dfdlT(async (result: AwaitableResult, inspect: any): Promise<any> => {
    const r = await result
    if (r.ok) inspect(r.value)
    return result
}, 2)
