import type { InferErr, InferOk } from "../types"
import type { Result } from "./types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Transforms the Err value using the `transform` function. If the result is an Err, applies the transform function to the error value and returns a new Err. If the result is Ok, returns it unchanged.
 *
 * @example
 * ```ts
 * // data-first
 * Result.mapErr(err("fail"), (e) => `Error: ${e}`);
 * // Err<string>("Error: fail")
 *
 * Result.mapErr(ok(5), (e) => `Error: ${e}`);
 * // Ok<number>(5)
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(
 *     err("fail"),
 *     Result.mapErr((e) => `Error: ${e}`),
 * );
 * // Err<string>("Error: fail")
 * ```
 */
export const mapErr: {
    <T extends Result, U>(transform: (error: InferErr<T>) => U): (result: T) => Result<InferOk<T>, U>
    <T extends Result, U>(result: T, transform: (error: InferErr<T>) => U): Result<InferOk<T>, U>
} = dfdlT((result: Result, transform: any): any => {
    return !result.ok ? { error: transform(result.error), ok: false } : result
}, 2)
