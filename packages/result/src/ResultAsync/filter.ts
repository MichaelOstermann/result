import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { err } from "../err"

/**
 * Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with `void`. If the result is already an Err, returns it unchanged.
 *
 * Can be used for type narrowing.
 *
 * @example
 * ```ts
 * await ResultAsync.filter(ok(5), (x) => x > 3);
 * // Ok<number>(5)
 *
 * await ResultAsync.filter(ok(1), (x) => x > 3);
 * // Err<void>
 *
 * await ResultAsync.filter(err("fail"), (x) => x > 3);
 * // Err<string>("fail")
 * ```
 *
 * @example
 * ```ts
 * await pipe(
 *     ok(5),
 *     ResultAsync.filter((x) => x > 3),
 * );
 * // Ok<number>(5)
 * ```
 */
export const filter: {
    <T extends AwaitableResult, U extends InferOk<T>>(
        predicate: (value: InferOk<T>) => value is U,
    ): (result: T) => ResultAsync<U, InferErr<T> | void>

    <T extends AwaitableResult>(
        predicate: (value: InferOk<T>) => boolean,
    ): (result: T) => ResultAsync<InferOk<T>, InferErr<T> | void>

    <T extends AwaitableResult, U extends InferOk<T>>(
        result: T,
        predicate: (value: InferOk<T>) => value is U,
    ): ResultAsync<U, InferErr<T> | void>

    <T extends AwaitableResult>(
        result: T,
        predicate: (value: InferOk<T>) => boolean,
    ): ResultAsync<InferOk<T>, InferErr<T> | void>
} = dfdlT(async (result: AwaitableResult, predicate: any): Promise<any> => {
    const r = await result
    if (!r.ok) return r
    if (predicate(r.value)) return r
    return err()
}, 2)
