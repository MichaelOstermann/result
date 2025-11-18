import type { Result } from "."
import type { InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Pattern matches on the `result` using the provided `patterns` object. Calls the `Ok` function if the result is Ok, or the `Err` function if the result is an Err.
 *
 * @example
 * ```ts
 * // data-first
 * Result.match(ok(5), {
 *     Ok: (x) => `Value: ${x}`,
 *     Err: (e) => `Error: ${e}`,
 * });
 * // "Value: 5"
 *
 * Result.match(err("fail"), {
 *     Ok: (x) => `Value: ${x}`,
 *     Err: (e) => `Error: ${e}`,
 * });
 * // "Error: fail"
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(
 *     ok(5),
 *     Result.match({
 *         Ok: (x) => `Value: ${x}`,
 *         Err: (e) => `Error: ${e}`,
 *     }),
 * );
 * // "Value: 5"
 * ```
 */
export const match: {
    <T extends Result, A, B>(patterns: { Err: (error: InferErr<T>) => B, Ok: (value: InferOk<T>) => A }): (result: T) => A | B
    <T extends Result, A, B>(result: T, patterns: { Err: (error: InferErr<T>) => B, Ok: (value: InferOk<T>) => A }): A | B
} = dfdlT((result: Result, patterns: any): any => {
    return result.ok
        ? patterns.Ok(result.value)
        : patterns.Err(result.error)
}, 2)
