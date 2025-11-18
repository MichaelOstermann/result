import type { Result } from "."
import type { InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { err } from "../err"

/**
 * Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, calls `orElse` with the Ok value and returns an Err with the result. If the result is already an Err, returns it unchanged.
 *
 * Can be used for type narrowing.
 *
 * @example
 * ```ts
 * // data-first
 * Result.filterOrElse(
 *     ok(5),
 *     (x) => x > 3,
 *     (x) => `${x} is too small`,
 * );
 * // Ok<number>(5)
 *
 * Result.filterOrElse(
 *     ok(1),
 *     (x) => x > 3,
 *     (x) => `${x} is too small`,
 * );
 * // Err<string>("1 is too small")
 *
 * Result.filterOrElse(
 *     err("fail"),
 *     (x) => x > 3,
 *     (x) => `${x} is too small`,
 * );
 * // Err<string>("fail")
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * pipe(
 *     ok(1),
 *     Result.filterOrElse(
 *         (x) => x > 3,
 *         (x) => `${x} is too small`,
 *     ),
 * );
 * // Err<string>("1 is too small")
 * ```
 */
export const filterOrElse: {
    <T extends Result, U extends InferOk<T>, V>(
        predicate: (value: InferOk<T>) => value is U,
        orElse: (value: Exclude<InferOk<T>, U>) => V
    ): (result: T) => Result<U, InferErr<T> | V>

    <T extends Result, V>(
        predicate: (value: InferOk<T>) => boolean,
        orElse: (value: InferOk<T>) => V
    ): (result: T) => Result<InferOk<T>, InferErr<T> | V>

    <T extends Result, U extends InferOk<T>, V>(
        result: T,
        predicate: (value: InferOk<T>) => value is U,
        orElse: (value: Exclude<InferOk<T>, U>) => V
    ): Result<U, InferErr<T> | V>

    <T extends Result, V>(
        result: T,
        predicate: (value: InferOk<T>) => boolean,
        orElse: (value: InferOk<T>) => V
    ): Result<InferOk<T>, InferErr<T> | V>
} = dfdlT((result: Result, predicate: any, orElse: any): any => {
    if (!result.ok) return result
    if (predicate(result.value)) return result
    return err(orElse(result.value))
}, 3)
