import type { ResultAsync } from "."
import type { AwaitableResult, InferErr, InferOk } from "../types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Chains Result-returning operations. If the `result` is Ok, applies the `transform` function to its value. If the `result` is Err, returns the Err unchanged.
 *
 * @example
 * ```ts
 * // data-first
 * await ResultAsync.andThen(ok(5), (x) => ok(x * 2));
 * // Ok<number>(10)
 *
 * await ResultAsync.andThen(err("fail"), (x) => ok(x * 2));
 * // Err<string>("fail")
 * ```
 *
 * @example
 * ```ts
 * // data-last
 * await pipe(
 *     ok(5),
 *     ResultAsync.andThen((x) => ok(x * 2)),
 * );
 * // Ok<number>(10)
 * ```
 */
export const andThen: {
    <T extends AwaitableResult, U extends AwaitableResult>(
        transform: (value: InferOk<T>) => U
    ): (result: T) => ResultAsync<InferOk<U>, InferErr<T> | InferErr<U>>

    <T extends AwaitableResult, U extends AwaitableResult>(
        result: T,
        transform: (value: InferOk<T>) => U
    ): ResultAsync<InferOk<U>, InferErr<T> | InferErr<U>>
} = dfdlT(async (result: AwaitableResult, transform: any): Promise<any> => {
    const r = await result
    return r.ok ? transform(r.value) : r
}, 2)
