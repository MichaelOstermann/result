import type { AwaitableResult, InferErr, InferOk } from "../types"
import type { ResultAsync } from "./types"
import { dfdlT } from "@monstermann/dfdl"
import { err } from "../err"
import { ok } from "../ok"

/**
 * Swaps the Ok and Err values of the `result`. An Ok becomes an Err and an Err becomes an Ok.
 *
 * @example
 * ```ts
 * await ResultAsync.flip(ok(5));
 * // Err<number>(5)
 *
 * await ResultAsync.flip(err("fail"));
 * // Ok<string>("fail")
 * ```
 *
 * @example
 * ```ts
 * await pipe(ok(5), ResultAsync.flip());
 * // Err<number>(5)
 * ```
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
