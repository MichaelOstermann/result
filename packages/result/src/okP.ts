import { isP } from "./internals.js"
import { ok } from "./ok.js"
import type { InferErr, InferOk, OkP, ResultLike, ResultP, SimplifyResult } from "./types.js"

/**
 * - Casts `T` into `OkP<T>`
 * - Casts `Promise<T>` into `OkP<T>`
 * - Casts other `Result` types into their async counterparts
 *
 * This can be particularly helpful to cast a `Result` into a `ResultP`, which enables the asynchronous signatures of most utilities.
 *
 * ```ts
 * ok(true); //=> OkP<boolean>
 * ok(Promise.resolve(true)); //=> OkP<boolean>
 * ok(ok(true)); //=> OkP<boolean>
 * ok(err(true)); //=> ErrP<boolean>
 * ok(okP(true)); //=> OkP<boolean>
 * ok(errP(true)); //=> ErrP<boolean>
 * ```
 */
export function okP(value: void): OkP<void>
export function okP<T>(value: T): OkPOrForwardResult<T>
export function okP(value: unknown): unknown {
    if (isP(value)) return value.then(ok as any)
    return Promise.resolve(ok(value))
}

type OkPOrForwardResult<T> = SimplifyResult<T extends unknown
    ? T extends ResultLike
        ? ResultP<InferOk<T>, InferErr<T>>
        : OkP<Awaited<T>>
    : never>
