import type { Result } from "."
import type { InferErr } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # inspectErr
 *
 * ```ts
 * function Result.inspectErr(
 *     result: Result<T, E>,
 *     inspect: (error: E) => void
 * ): Result<T, E>
 * ```
 *
 * Inspects the Err value using the `inspect` function without changing the result. If the result is an Err, calls the inspect function with the error value and returns the original result unchanged. If the result is Ok, returns it unchanged without calling inspect.
 *
 * ## Example
 *
 * ```ts [data-first]
 * Result.inspectErr(err("fail"), (e) => console.log(`Error: ${e}`));
 * // Err<string>("fail") - logs "Error: fail"
 *
 * Result.inspectErr(ok(5), (e) => console.log(`Error: ${e}`));
 * // Ok<number>(5) - no log
 * ```
 *
 * ```ts [data-last]
 * pipe(
 *     err("fail"),
 *     Result.inspectErr((e) => console.log(`Error: ${e}`)),
 * );
 * // Err<string>("fail") - logs "Error: fail"
 * ```
 *
 */
export const inspectErr: {
    <T extends Result>(inspect: (error: InferErr<T>) => void): (result: T) => T
    <T extends Result>(result: T, inspect: (error: InferErr<T>) => void): T
} = dfdlT((result: Result, inspect: any): any => {
    if (!result.ok) inspect(result.error)
    return result
}, 2)
