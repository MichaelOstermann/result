import type { AwaitableResult, InferErr, InferOk } from "../types"
import type { ResultAsync } from "./types"
import { dfdlT } from "@monstermann/dfdl"

/**
 * Performs a logical OR operation on two results. Returns `a` if it's Ok, otherwise returns `b`.
 *
 * @example
 * ```ts
 * await ResultAsync.or(ok(1), ok(2));
 * // Ok<number>(1)
 *
 * await ResultAsync.or(err("fail"), ok(2));
 * // Ok<number>(2)
 *
 * await ResultAsync.or(err("fail1"), err("fail2"));
 * // Err<string>("fail2")
 * ```
 *
 * @example
 * ```ts
 * await pipe(err("fail"), ResultAsync.or(ok(2)));
 * // Ok<number>(2)
 * ```
 */
export const or: {
    <U extends AwaitableResult>(b: U): <T extends AwaitableResult>(a: T) => ResultAsync<InferOk<T> | InferOk<U>, InferErr<U>>
    <T extends AwaitableResult, U extends AwaitableResult>(a: T, b: U): ResultAsync<InferOk<T> | InferOk<U>, InferErr<U>>
} = dfdlT(async (a: AwaitableResult, b: AwaitableResult): Promise<any> => {
    return (await a).ok ? a : b
}, 2)
