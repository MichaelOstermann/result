import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"
import { err } from "../err"
import { ok } from "../ok"

/**
 * # flip
 *
 * ```ts
 * function ResultAsync.flip(
 *     result: AwaitableResult<T, E>
 * ): ResultAsync<E, T>
 * ```
 *
 * Swaps the Ok and Err values of the `result`. An Ok becomes an Err and an Err becomes an Ok.
 *
 * ## Example
 *
 * ```ts [data-first]
 * await ResultAsync.flip(ok(5));
 * // Err<number>(5)
 *
 * await ResultAsync.flip(err("fail"));
 * // Ok<string>("fail")
 * ```
 *
 * ```ts [data-last]
 * await pipe(ok(5), ResultAsync.flip());
 * // Err<number>(5)
 * ```
 *
 */
export const flip: {
    (): <T extends AwaitableResult>(result: T) => ResultAsync<InferErr<T>, InferOk<T>>
    <T extends AwaitableResult>(result: T): ResultAsync<InferErr<T>, InferOk<T>>
} = dfdlT(async (result: AwaitableResult): Promise<any> => {
    const r = await result
    return r.ok
        ? err(r.value)
        : ok(r.error)
}, 1)
