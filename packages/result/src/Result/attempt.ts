import type { Result } from "."
import { err } from "../err"
import { ok } from "../ok"

/**
 * Wraps a function that may throw an exception in a Result. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, returns the error wrapped in Err.
 *
 * @example
 * ```ts
 * Result.try(() => 5);
 * // Ok<number>(5)
 *
 * Result.try(() => {
 *     throw new Error("Something went wrong");
 * });
 * // Err<Error>(Error: Something went wrong)
 *
 * Result.try(() => JSON.parse('{"valid": true}'));
 * // Ok<object>({valid: true})
 * ```
 */
export function attempt<T>(unsafeFn: () => T): Result<T, unknown> {
    try {
        return ok(unsafeFn())
    }
    catch (error) {
        return err(error)
    }
}
