import type { AwaitableResult, InferErr, InferOk } from "../types"
import type { ResultAsync } from "./types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Uses a fallback result computed by `transform` if the current result is an Err. If the result is Ok, returns it unchanged. If the result is an Err, calls `transform` with the error value to produce an alternative result.
 *
 * @example
 * ```ts
 * await ResultAsync.orElse(ok(5), (e) => ok(0));
 * // Ok<number>(5)
 *
 * await ResultAsync.orElse(err("fail"), (e) => ok(0));
 * // Ok<number>(0)
 *
 * await ResultAsync.orElse(err("fail"), (e) => err(`Handled: ${e}`));
 * // Err<string>("Handled: fail")
 * ```
 *
 * @example
 * ```ts
 * await pipe(
 *     err("fail"),
 *     ResultAsync.orElse((e) => ok(0)),
 * );
 * // Ok<number>(0)
 * ```
 */
export const orElse: {
    <T extends AwaitableResult, U extends AwaitableResult>(transform: (error: InferErr<T>) => U): (result: T) => ResultAsync<InferOk<T> | InferOk<U>, InferErr<U>>
    <T extends AwaitableResult, U extends AwaitableResult>(result: T, transform: (error: InferErr<T>) => U): ResultAsync<InferOk<T> | InferOk<U>, InferErr<U>>
} = dfdlT(async (result: AwaitableResult, transform: any): Promise<any> => {
    const r = await result
    return r.ok ? r : await transform(r.error)
}, 2)
