import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { err } from "../err"

/**
 * # filterOrElse
 *
 * ```ts
 * function ResultAsync.filterOrElse(
 *     result: AwaitableResult<T, E>,
 *     predicate: (value: T) => boolean,
 *     orElse: (value: T) => F | Promise<F>
 * ): ResultAsync<T, E | F>
 * ```
 *
 * Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, calls `orElse` with the Ok value and returns an Err with the result. If the result is already an Err, returns it unchanged.
 *
 * Can be used for type narrowing.
 *
 * ## Example
 *
 * ```ts [data-first]
 * await ResultAsync.filterOrElse(
 *     ok(5),
 *     (x) => x > 3,
 *     (x) => `${x} is too small`,
 * );
 * // Ok<number>(5)
 *
 * await ResultAsync.filterOrElse(
 *     ok(1),
 *     (x) => x > 3,
 *     (x) => `${x} is too small`,
 * );
 * // Err<string>("1 is too small")
 *
 * await ResultAsync.filterOrElse(
 *     err("fail"),
 *     (x) => x > 3,
 *     (x) => `${x} is too small`,
 * );
 * // Err<string>("fail")
 * ```
 *
 * ```ts [data-last]
 * await pipe(
 *     ok(1),
 *     ResultAsync.filterOrElse(
 *         (x) => x > 3,
 *         (x) => `${x} is too small`,
 *     ),
 * );
 * // Err<string>("1 is too small")
 * ```
 *
 */
export const filterOrElse: {
    <T extends AwaitableResult, U extends InferOk<T>, V>(
        predicate: (value: InferOk<T>) => value is U,
        orElse: (value: Exclude<InferOk<T>, U>) => V
    ): (result: T) => ResultAsync<U, InferErr<T> | Awaited<V>>

    <T extends AwaitableResult, V>(
        predicate: (value: InferOk<T>) => boolean,
        orElse: (value: InferOk<T>) => V
    ): (result: T) => ResultAsync<InferOk<T>, InferErr<T> | Awaited<V>>

    <T extends AwaitableResult, U extends InferOk<T>, V>(
        result: T,
        predicate: (value: InferOk<T>) => value is U,
        orElse: (value: Exclude<InferOk<T>, U>) => V
    ): ResultAsync<U, InferErr<T> | Awaited<V>>

    <T extends AwaitableResult, V>(
        result: T,
        predicate: (value: InferOk<T>) => boolean,
        orElse: (value: InferOk<T>) => V
    ): ResultAsync<InferOk<T>, InferErr<T> | Awaited<V>>
} = dfdlT(async (result: AwaitableResult, predicate: any, orElse: any): Promise<any> => {
    const r = await result
    if (!r.ok) return r
    if (predicate(r.value)) return r
    return err(await orElse(r.value))
}, 3)
