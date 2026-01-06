import type { Result } from "."
import type { InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * # mapOrElse
 *
 * ```ts
 * function Result.mapOrElse(
 *     result: Result<T, E>,
 *     transform: (value: T) => U,
 *     orElse: (error: E) => F
 * ): U | F
 * ```
 *
 * Unwraps the Ok value using the `transform` function, or transforms the Err value using the `orElse` function.
 *
 * ## Example
 *
 * ```ts [data-first]
 * Result.mapOrElse(
 *     ok(5),
 *     (x) => x * 2,
 *     (e) => `Error: ${e}`,
 * );
 * // 10
 *
 * Result.mapOrElse(
 *     err("fail"),
 *     (x) => x * 2,
 *     (e) => `Error: ${e}`,
 * );
 * // "Error: fail"
 * ```
 *
 * ```ts [data-last]
 * pipe(
 *     ok(5),
 *     Result.mapOrElse(
 *         (x) => x * 2,
 *         (e) => `Error: ${e}`,
 *     ),
 * );
 * // 10
 * ```
 *
 */
export const mapOrElse: {
    <T extends Result, U, V>(transform: (value: InferOk<T>) => U, orElse: (error: InferErr<T>) => V): (result: T) => U | V
    <T extends Result, U, V>(result: T, transform: (value: InferOk<T>) => U, orElse: (error: InferErr<T>) => V): U | V
} = dfdlT((result: Result, transform: any, orElse: any): any => {
    return result.ok ? transform(result.value) : orElse(result.error)
}, 3)
