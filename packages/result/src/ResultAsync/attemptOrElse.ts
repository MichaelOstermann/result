import type { ResultAsync } from "."
import { err } from "../err"
import { ok } from "../ok"

/**
 * Wraps a function that may throw an exception in a Result, transforming any caught error. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, transforms the error using `orElse` and returns it wrapped in Err.
 *
 * @example
 * ```ts
 * await ResultAsync.attemptOrElse(
 *     () => 5,
 *     (e) => `Error: ${e}`,
 * );
 * // Ok<number>(5)
 *
 * await ResultAsync.attemptOrElse(
 *     () => {
 *         throw new Error("Something went wrong");
 *     },
 *     (e) => `Caught: ${e.message}`,
 * );
 * // Err<string>("Caught: Something went wrong")
 *
 * await ResultAsync.attemptOrElse(
 *     () => JSON.parse("invalid json"),
 *     (e) => new Error("Failed to parse json", { cause: e }),
 * );
 * // Err<Error>(new Error("Failed to parse json", { cause: e }))
 * ```
 */
export async function attemptOrElse<T, U>(unsafeFn: () => T, orElse: (error: unknown) => U): ResultAsync<Awaited<T>, Awaited<U>> {
    try {
        return ok(await unsafeFn())
    }
    catch (error) {
        return err(await orElse(error))
    }
}
