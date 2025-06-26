import type { Result } from "./types"
import { dual } from "@monstermann/dfdl"

/**
 * A function that takes an `unknown` value and narrows it to `Result<unknown, unknown>`.
 *
 * ```ts
 * isResult(ok(true)); //=> true
 * isResult(err(false)); //=> true
 * isResult(true); //=> false
 *
 * pipe(ok(true), isResult()); //=> true
 * pipe(err(false), isResult()); //=> true
 * pipe(true, isResult()); //=> false
 * ```
 */
export const isResult: {
    (): (value: unknown) => value is Result
    (value: unknown): value is Result
} = dual(1, (value: unknown): value is Result => {
    return typeof value === "object"
        && value !== null
        && "ok" in value
        && typeof value.ok === "boolean"
        && ("value" in value || "error" in value)
})
