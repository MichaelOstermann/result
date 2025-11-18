import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { err } from "../err"

/**
 * Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with the `or` value. If the result is already an Err, returns it unchanged.
 *
 * Can be used for type narrowing.
 *
 * @example
 * ```ts
 * await ResultAsync.filterOr(ok(5), (x) => x > 3, "too small");
 * // Ok<number>(5)
 *
 * await ResultAsync.filterOr(ok(1), (x) => x > 3, "too small");
 * // Err<string>("too small")
 *
 * await ResultAsync.filterOr(err("fail"), (x) => x > 3, "too small");
 * // Err<string>("fail")
 * ```
 *
 * @example
 * ```ts
 * await pipe(
 *     ok(1),
 *     ResultAsync.filterOr((x) => x > 3, "too small"),
 * );
 * // Err<string>("too small")
 * ```
 */
export const filterOr: {
    <T extends AwaitableResult, U extends InferOk<T>, V>(
        predicate: (value: InferOk<T>) => value is U,
        or: V
    ): (result: T) => ResultAsync<U, InferErr<T> | Awaited<V>>

    <T extends AwaitableResult, V>(
        predicate: (value: InferOk<T>) => boolean,
        or: V
    ): (result: T) => ResultAsync<InferOk<T>, InferErr<T> | Awaited<V>>

    <T extends AwaitableResult, U extends InferOk<T>, V>(
        result: T,
        predicate: (value: InferOk<T>) => value is U,
        or: V
    ): ResultAsync<U, InferErr<T> | Awaited<V>>

    <T extends AwaitableResult, V>(
        result: T,
        predicate: (value: InferOk<T>) => boolean,
        or: V
    ): ResultAsync<InferOk<T>, InferErr<T> | Awaited<V>>
} = dfdlT(async (result: AwaitableResult, predicate: any, or: any): Promise<any> => {
    const r = await result
    if (!r.ok) return r
    if (predicate(r.value)) return r
    return err(await or)
}, 3)
