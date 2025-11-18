import type { ResultAsync } from "."
import { err } from "../err"
import { ok } from "../ok"

/**
 * Wraps a function that may throw an exception in a Result. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, returns the error wrapped in Err.
 *
 * @example
 * ```ts
 * await ResultAsync.attempt(() => 5);
 * // Ok<number>(5)
 *
 * await ResultAsync.attempt(() => {
 *     throw new Error("Something went wrong");
 * });
 * // Err<Error>(Error: Something went wrong)
 *
 * await ResultAsync.attempt(() => JSON.parse('{"valid": true}'));
 * // Ok<object>({valid: true})
 * ```
 */
export async function attempt<T>(unsafeFn: () => T): ResultAsync<Awaited<T>, unknown> {
    try {
        return ok(await unsafeFn())
    }
    catch (error) {
        return err(error)
    }
}
