import type { Result } from "."
import type { InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # inspect
 *
 * ```ts
 * function Result.inspect(
 *     result: Result<T, E>,
 *     inspect: (value: T) => void
 * ): Result<T, E>
 * ```
 *
 * Inspects the Ok value using the `inspect` function without changing the result. If the result is Ok, calls the inspect function with the value and returns the original result unchanged. If the result is an Err, returns it unchanged without calling inspect.
 *
 * ## Example
 *
 * ```ts [data-first]
 * Result.inspect(ok(5), (x) => console.log(`Value: ${x}`));
 * // Ok<number>(5) - logs "Value: 5"
 *
 * Result.inspect(err("fail"), (x) => console.log(`Value: ${x}`));
 * // Err<string>("fail") - no log
 * ```
 *
 * ```ts [data-last]
 * pipe(
 *     ok(5),
 *     Result.inspect((x) => console.log(`Value: ${x}`)),
 * );
 * // Ok<number>(5) - logs "Value: 5"
 * ```
 *
 */
export const inspect: {
    <T extends Result>(inspect: (value: InferOk<T>) => void): (result: T) => T
    <T extends Result>(result: T, inspect: (value: InferOk<T>) => void): T
} = dfdlT((result: Result, inspect: any): any => {
    if (result.ok) inspect(result.value)
    return result
}, 2)
