import type { InferErr, InferOk } from "../types"
import type { Result } from "./types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Transforms the value inside an Ok result using the `transform` function. If the `result` is an Err, it returns the Err unchanged.
 *
 * @example
 * ```ts
 * // data-first
 * Result.map(ok(5), (x) => x * 2);
 * // Ok<number>
 *
 * Result.map(err("fail"), (x) => x * 2);
 * // Err<string>
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(
 *     ok(5),
 *     Result.map((x) => x * 2),
 * );
 * // Ok<number>
 * ```
 */
export const map: {
    <T extends Result, U>(transform: (value: InferOk<T>) => U): (result: T) => Result<U, InferErr<T>>
    <T extends Result, U>(result: T, transform: (value: InferOk<T>) => U): Result<U, InferErr<T>>
} = dfdlT((result: Result, transform: any): any => {
    return result.ok ? { ok: true, value: transform(result.value) } : result
}, 2)
