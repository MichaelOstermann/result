import type { InferOk, Result, ResultP } from "./types"
import { dfdlT } from "@monstermann/dfdl"
import { mapP } from "./internals"

/**
 * Extracts the `Ok` value from a `Result`, otherwise throws the `Err` value.
 *
 * ```ts
 * okOrThrow(ok(true)); //=> true
 * okOrThrow(err("message")); // Throws "message"
 * await okOrThrow(okP(true)); //=> true
 * await okOrThrow(errP("message")); // Throws "message"
 *
 * pipe(ok(true), okOrThrow()); //=> true
 * pipe(err("message"), okOrThrow()); // Throws "message"
 * await pipe(okP(true), okOrThrow()); //=> true
 * await pipe(errP("message"), okOrThrow()); // Throws "message"
 * ```
 */
export const okOrThrow: {
    (): <T extends Result>(result: T) => InferOk<T>
    (): <T extends ResultP>(result: T) => Promise<InferOk<T>>

    <T extends Result>(result: T): InferOk<T>
    <T extends ResultP>(result: T): Promise<InferOk<T>>
} = dfdlT((result: any): any => {
    return mapP(result, (result: any) => {
        if (result.ok) return result.value
        throw result.error
    })
})
