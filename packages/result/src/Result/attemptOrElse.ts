import type { Result } from "."
import { err } from "../err"
import { ok } from "../ok"

/**
 * # attemptOrElse
 *
 * ```ts
 * function Result.attemptOrElse(
 *     unsafeFn: () => T,
 *     orElse: (error: unknown) => E
 * ): Result<T, E>
 * ```
 *
 * Wraps a function that may throw an exception in a Result, transforming any caught error. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, transforms the error using `orElse` and returns it wrapped in Err.
 *
 * ## Example
 *
 * ```ts
 * Result.attemptOrElse(
 *     () => 5,
 *     (e) => `Error: ${e}`,
 * );
 * // Ok<number>(5)
 *
 * Result.attemptOrElse(
 *     () => {
 *         throw new Error("Something went wrong");
 *     },
 *     (e) => `Caught: ${e.message}`,
 * );
 * // Err<string>("Caught: Something went wrong")
 *
 * Result.attemptOrElse(
 *     () => JSON.parse("invalid json"),
 *     (e) => new Error("Failed to parse json", { cause: e }),
 * );
 * // Err<Error>(new Error("Failed to parse json", { cause: e }))
 * ```
 *
 */
export function attemptOrElse<T, U>(unsafeFn: () => T, orElse: (error: unknown) => U): Result<T, U> {
    try {
        return ok(unsafeFn())
    }
    catch (error) {
        return err(orElse(error))
    }
}
