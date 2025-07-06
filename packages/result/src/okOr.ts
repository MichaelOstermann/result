import type { InferOk, Result, ResultP } from "./types"
import { dfdlT } from "@monstermann/dfdl"
import { mapP } from "./internals"

/**
 * Extracts the `Ok` value from a `Result`, otherwise returns the fallback.
 *
 * ```ts
 * okOr(ok(true), false); //=> true
 * okOr(err(false), true); //=> true
 * await okOr(okP(true), Promise.resolve(false)); //=> true
 * await okOr(errP(false), Promise.resolve(true)); //=> true
 *
 * pipe(ok(true), okOr(false)); // true
 * pipe(err(false), okOr(true)); // true
 * await pipe(okP(true), okOr(Promise.resolve(false))); // true
 * await pipe(errP(false), okOr(Promise.resolve(true))); // true
 * ```
 */
export const okOr: {
    <U>(or: U): <T extends Result>(result: T) => InferOk<T> | U
    <U>(or: U): <T extends ResultP>(result: T) => Promise<InferOk<T> | Awaited<U>>

    <T extends Result, U>(result: T, or: U): InferOk<T> | U
    <T extends ResultP, U>(result: T, or: U): Promise<InferOk<T> | Awaited<U>>
} = dfdlT((result: any, or: any): any => {
    return mapP(result, (result: any) => result.ok ? result.value : or)
})
