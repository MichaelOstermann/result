import type { InferErr, InferOk, Result, ResultP } from "./types"
import { dfdlT } from "@monstermann/dfdl"
import { mapP } from "./internals"

/**
 * Extracts the `Ok` value from a `Result`, otherwise applies the `Err` value to the given function and returns its output.
 *
 * ```ts
 * okOrElse(ok(true), () => false); //=> true
 * okOrElse(err(false), (error) => true); //=> true
 * await okOrElse(okP(true), async () => false); //=> true
 * await okOrElse(errP(false), async (error) => true); //=> true
 *
 * pipe(
 *     ok(true),
 *     okOrElse((error) => false),
 * ); //=> true
 *
 * pipe(
 *     err(false),
 *     okOrElse((error) => true),
 * ); //=> true
 *
 * await pipe(
 *     okP(true),
 *     okOrElse(async () => true),
 * ); //=> true
 *
 * await pipe(
 *     errP(false),
 *     okOrElse(async (error) => true),
 * ); //=> true
 * ```
 */
export const okOrElse: {
    <T extends Result, U>(orElse: (error: InferErr<T>) => U): (result: T) => InferOk<T> | U
    <T extends ResultP, U>(orElse: (error: InferErr<T>) => U): (result: T) => Promise<InferOk<T> | Awaited<U>>

    <T extends Result, U>(result: T, orElse: (error: InferErr<T>) => U): InferOk<T> | U
    <T extends ResultP, U>(result: T, orElse: (error: InferErr<T>) => U): Promise<InferOk<T> | Awaited<U>>
} = dfdlT((result: any, orElse: any): any => {
    return mapP(result, (result: any) => result.ok ? result.value : orElse(result.error))
})
