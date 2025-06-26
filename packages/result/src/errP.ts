import type { ErrP, InferErr, InferOk, ResultLike, ResultP, SimplifyResult } from "./types"
import { err } from "./err"
import { isP } from "./internals"

/**
 * - Casts `T` into `ErrP<T>`
 * - Casts `Promise<T>` into `ErrP<T>`
 * - Casts other `Result` types into their async counterparts
 *
 * ```ts
 * errP(true); //=> ErrP<boolean>
 * errP(Promise.resolve(true)); //=> ErrP<boolean>
 * errP(ok(true)); //=> OkP<boolean>
 * errP(err(true)); //=> ErrP<boolean>
 * errP(okP(true)); //=> OkP<boolean>
 * errP(errP(true)); //=> ErrP<boolean>
 * ```
 */
export function errP(value: void): ErrP<void>
export function errP<T>(value: T): ErrPOrForwardResult<T>
export function errP(value: unknown): unknown {
    if (isP(value)) return value.then(err as any)
    return Promise.resolve(err(value))
}

type ErrPOrForwardResult<T> = SimplifyResult<T extends unknown
    ? T extends ResultLike
        ? ResultP<InferOk<T>, InferErr<T>>
        : ErrP<Awaited<T>>
    : never>
