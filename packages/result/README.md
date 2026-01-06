<div align="center">

<h1>result</h1>

![Minified](https://img.shields.io/badge/Minified-5.00_KB-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff) ![Minzipped](https://img.shields.io/badge/Minzipped-1.00_KB-blue?style=flat-square&labelColor=%2315161D&color=%2369a1ff)

**Functional utilities for success | error types.**

[Documentation](https://MichaelOstermann.github.io/result)

</div>

## Overview

The types `Ok<T>` and `Err<T>` are expressed as plain objects, no wrapper classes are involved - you can act upon the raw objects however you wish and build your own functions around them:

```ts
import type { Result, Ok, Err } from "@monstermann/result";
import { ok, err } from "@monstermann/result";

const a = ok(true);
const b: Ok<boolean> = { ok: true, value: true };

const c = err(false);
const d: Err<boolean> = { ok: false, error: false };

const e: Result<boolean, string> = { ok: true, value: true };
// Narrowed to Ok<boolean>
if (e.ok) console.log(e.value);
// Narrowed to Err<string>
if (!e.ok) console.log(e.error);
```

### Async

Asynchronous results are simply expressed as `Promise<Ok<T>>` and `Promise<Err<T>>` and typically require no special constructors (eg. `async (v) => ok(v)` is enough).

```ts
import { ResultAsync, ok } from "@monstermann/result";

const a = ok(5); // Ok<number>(5)
const b = ResultAsync.map(a, (x) => x * 2); // OkAsync<number>(10)
const c = ResultAsync.map(b, (x) => x * 2); // OkAsync<number>(20)
```

### Pipe

Most functions come with "data-first" and "data-last" signatures, meaning they are [`pipe`](https://michaelostermann.github.io/dfdl/#pipe) friendly:

<!-- prettier-ignore -->
```ts [data-first]
import { Result, ok } from "@monstermann/result"

Result.map(
    ok(5),
    (x) => x * 2
);
// Ok<number>

Result.map(
    err("fail"),
    (x) => x * 2
);
// Err<string>
```

<!-- prettier-ignore -->
```ts [data-last]
import { Result, ok } from "@monstermann/result"

pipe(
    ok(5),
    Result.map((x) => x * 2),
);
// Ok<number>

pipe(
    err("fail"),
    Result.map((x) => x * 2),
);
// Err<string>
```

## Installation

```sh [npm]
npm install @monstermann/result
```

```sh [pnpm]
pnpm add @monstermann/result
```

```sh [yarn]
yarn add @monstermann/result
```

```sh [bun]
bun add @monstermann/result
```

## Tree-shaking

### Installation

```sh [npm]
npm install -D @monstermann/unplugin-result
```

```sh [pnpm]
pnpm -D add @monstermann/unplugin-result
```

```sh [yarn]
yarn -D add @monstermann/unplugin-result
```

```sh [bun]
bun -D add @monstermann/unplugin-result
```

### Usage

```ts [Vite]
// vite.config.ts
import result from "@monstermann/unplugin-result/vite";

export default defineConfig({
    plugins: [result()],
});
```

```ts [Rollup]
// rollup.config.js
import result from "@monstermann/unplugin-result/rollup";

export default {
    plugins: [result()],
};
```

```ts [Rolldown]
// rolldown.config.js
import result from "@monstermann/unplugin-result/rolldown";

export default {
    plugins: [result()],
};
```

```ts [Webpack]
// webpack.config.js
const result = require("@monstermann/unplugin-result/webpack");

module.exports = {
    plugins: [result()],
};
```

```ts [Rspack]
// rspack.config.js
const result = require("@monstermann/unplugin-result/rspack");

module.exports = {
    plugins: [result()],
};
```

```ts [ESBuild]
// esbuild.config.js
import { build } from "esbuild";
import result from "@monstermann/unplugin-result/esbuild";

build({
    plugins: [result()],
});
```

## Alternatives

- [supermacro/neverthrow](https://github.com/supermacro/neverthrow)
- [badrap/result](https://github.com/badrap/result)
- [cevr/ftld](https://github.com/cevr/ftld)
- [Borderliner/neverever](https://github.com/Borderliner/neverever)
- [biw/enwrap](https://github.com/biw/enwrap)
- [Snowflyt/tinyeffect](https://github.com/Snowflyt/tinyeffect)

## Result

### all

```ts
function Result.all(results: Result<T, E>[]): Result<T[], E>
```

Combines multiple `results` into a single result. If all results are Ok, returns an Ok containing an array of all values. If any result is an Err, returns the first Err encountered.

#### Example

```ts
Result.all([ok(1), ok(2), ok(3)]);
// Ok<number[]>([1, 2, 3])

Result.all([ok(1), err("fail"), ok(3)]);
// Err<string>("fail")
```

### and

```ts
function Result.and(
    a: Result<T, E>,
    b: Result<U, F>
): Result<U, E | F>
```

Performs a logical AND operation on two results. Returns `b` if `a` is Ok, otherwise returns `a` (which must be an Err).

#### Example

```ts [data-first]
Result.and(ok(1), ok("success"));
// Ok<string>("success")

Result.and(err("fail"), ok("success"));
// Err<string>("fail")

Result.and(ok(1), err("fail"));
// Err<string>("fail")
```

```ts [data-last]
pipe(ok(1), Result.and(ok("success")));
// Ok<string>("success")
```

### andThen

```ts
function Result.andThen(
    result: Result<T, E>,
    transform: (value: T) => Result<U, F>
): Result<U, E | F>
```

Chains Result-returning operations. If the `result` is Ok, applies the `transform` function to its value. If the `result` is Err, returns the Err unchanged.

#### Example

```ts [data-first]
Result.andThen(ok(5), (x) => ok(x * 2));
// Ok<number>

Result.andThen(err("fail"), (x) => ok(x * 2));
// Err<string>
```

```ts [data-last]
pipe(
    ok(5),
    Result.andThen((x) => ok(x * 2)),
);
// Ok<number>
```

### any

```ts
function Result.any(results: Result<T, E>[]): Result<T, E[]>
```

Returns the first Ok result from the array of `results`, or an Err containing an array of all errors if all results are Err.

#### Example

```ts
Result.any([ok(1), err("fail"), ok(3)]);
// Ok<number>(1)

Result.any([err("fail1"), err("fail2"), err("fail3")]);
// Err<string[]>(["fail1", "fail2", "fail3"])
```

### attempt

```ts
function Result.attempt(unsafeFn: () => T): Result<T, unknown>
```

Wraps a function that may throw an exception in a Result. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, returns the error wrapped in Err.

#### Example

```ts
Result.attempt(() => 5);
// Ok<number>(5)

Result.attempt(() => {
    throw new Error("Something went wrong");
});
// Err<Error>(Error: Something went wrong)

Result.attempt(() => JSON.parse('{"valid": true}'));
// Ok<object>({valid: true})
```

### attemptOr

```ts
function Result.attemptOr(unsafeFn: () => T, or: E): Result<T, E>
```

Wraps a function that may throw an exception in a Result, using a specific error value. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, returns the `or` value wrapped in Err.

#### Example

```ts
Result.attemptOr(() => 5, "default error");
// Ok<number>(5)

Result.attemptOr(() => {
    throw new Error("Something went wrong");
}, "default error");
// Err<string>("default error")

Result.attemptOr(() => JSON.parse("invalid json"), "parse failed");
// Err<string>("parse failed")
```

### attemptOrElse

```ts
function Result.attemptOrElse(
    unsafeFn: () => T,
    orElse: (error: unknown) => E
): Result<T, E>
```

Wraps a function that may throw an exception in a Result, transforming any caught error. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, transforms the error using `orElse` and returns it wrapped in Err.

#### Example

```ts
Result.attemptOrElse(
    () => 5,
    (e) => `Error: ${e}`,
);
// Ok<number>(5)

Result.attemptOrElse(
    () => {
        throw new Error("Something went wrong");
    },
    (e) => `Caught: ${e.message}`,
);
// Err<string>("Caught: Something went wrong")

Result.attemptOrElse(
    () => JSON.parse("invalid json"),
    (e) => new Error("Failed to parse json", { cause: e }),
);
// Err<Error>(new Error("Failed to parse json", { cause: e }))
```

### expect

```ts
function Result.expect(result: Result<T, E>, message: string): T
```

Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with the given `message`.

#### Example

```ts [data-first]
Result.expect(ok(5), "Expected a value");
// 5

Result.expect(err("fail"), "Expected a value");
// throws ResultError("Expected a value")
```

```ts [data-last]
pipe(ok(5), Result.expect("Expected a value"));
// 5
```

### expectErr

```ts
function Result.expectErr(result: Result<T, E>, message: string): E
```

Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with the given `message`.

#### Example

```ts [data-first]
Result.expectErr(err("fail"), "Expected an error");
// "fail"

Result.expectErr(ok(5), "Expected an error");
// throws ResultError("Expected an error")
```

```ts [data-last]
pipe(err("fail"), Result.expectErr("Expected an error"));
// "fail"
```

### filter

```ts
function Result.filter(
    result: Result<T, E>,
    predicate: (value: T) => boolean
): Result<T, E | void>
```

Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with `void`. If the result is already an Err, returns it unchanged.

Can be used for type narrowing.

#### Example

```ts [data-first]
Result.filter(ok(5), (x) => x > 3);
// Ok<number>(5)

Result.filter(ok(1), (x) => x > 3);
// Err<void>

Result.filter(err("fail"), (x) => x > 3);
// Err<string>("fail")
```

```ts [data-last]
pipe(
    ok(5),
    Result.filter((x) => x > 3),
);
// Ok<number>(5)
```

### filterOr

```ts
function Result.filterOr(
    result: Result<T, E>,
    predicate: (value: T) => boolean,
    or: F
): Result<T, E | F>
```

Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with the `or` value. If the result is already an Err, returns it unchanged.

Can be used for type narrowing.

#### Example

```ts [data-first]
Result.filterOr(ok(5), (x) => x > 3, "too small");
// Ok<number>(5)

Result.filterOr(ok(1), (x) => x > 3, "too small");
// Err<string>("too small")

Result.filterOr(err("fail"), (x) => x > 3, "too small");
// Err<string>("fail")
```

```ts [data-last]
pipe(
    ok(1),
    Result.filterOr((x) => x > 3, "too small"),
);
// Err<string>("too small")
```

### filterOrElse

```ts
function Result.filterOrElse(
    result: Result<T, E>,
    predicate: (value: T) => boolean,
    orElse: (value: T) => F
): Result<T, E | F>
```

Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, calls `orElse` with the Ok value and returns an Err with the result. If the result is already an Err, returns it unchanged.

Can be used for type narrowing.

#### Example

```ts [data-first]
Result.filterOrElse(
    ok(5),
    (x) => x > 3,
    (x) => `${x} is too small`,
);
// Ok<number>(5)

Result.filterOrElse(
    ok(1),
    (x) => x > 3,
    (x) => `${x} is too small`,
);
// Err<string>("1 is too small")

Result.filterOrElse(
    err("fail"),
    (x) => x > 3,
    (x) => `${x} is too small`,
);
// Err<string>("fail")
```

```ts [data-last]
pipe(
    ok(1),
    Result.filterOrElse(
        (x) => x > 3,
        (x) => `${x} is too small`,
    ),
);
// Err<string>("1 is too small")
```

### flip

```ts
function Result.flip(result: Result<T, E>): Result<E, T>
```

Swaps the Ok and Err values of the `result`. An Ok becomes an Err and an Err becomes an Ok.

#### Example

```ts [data-first]
Result.flip(ok(5));
// Err<number>(5)

Result.flip(err("fail"));
// Ok<string>("fail")
```

```ts [data-last]
pipe(ok(5), Result.flip());
// Err<number>(5)
```

### inspect

```ts
function Result.inspect(
    result: Result<T, E>,
    inspect: (value: T) => void
): Result<T, E>
```

Inspects the Ok value using the `inspect` function without changing the result. If the result is Ok, calls the inspect function with the value and returns the original result unchanged. If the result is an Err, returns it unchanged without calling inspect.

#### Example

```ts [data-first]
Result.inspect(ok(5), (x) => console.log(`Value: ${x}`));
// Ok<number>(5) - logs "Value: 5"

Result.inspect(err("fail"), (x) => console.log(`Value: ${x}`));
// Err<string>("fail") - no log
```

```ts [data-last]
pipe(
    ok(5),
    Result.inspect((x) => console.log(`Value: ${x}`)),
);
// Ok<number>(5) - logs "Value: 5"
```

### inspectErr

```ts
function Result.inspectErr(
    result: Result<T, E>,
    inspect: (error: E) => void
): Result<T, E>
```

Inspects the Err value using the `inspect` function without changing the result. If the result is an Err, calls the inspect function with the error value and returns the original result unchanged. If the result is Ok, returns it unchanged without calling inspect.

#### Example

```ts [data-first]
Result.inspectErr(err("fail"), (e) => console.log(`Error: ${e}`));
// Err<string>("fail") - logs "Error: fail"

Result.inspectErr(ok(5), (e) => console.log(`Error: ${e}`));
// Ok<number>(5) - no log
```

```ts [data-last]
pipe(
    err("fail"),
    Result.inspectErr((e) => console.log(`Error: ${e}`)),
);
// Err<string>("fail") - logs "Error: fail"
```

### map

```ts
function Result.map(
    result: Result<T, E>,
    transform: (value: T) => U
): Result<U, E>
```

Transforms the value inside an Ok result using the `transform` function. If the `result` is an Err, it returns the Err unchanged.

#### Example

```ts [data-first]
Result.map(ok(5), (x) => x * 2);
// Ok<number>

Result.map(err("fail"), (x) => x * 2);
// Err<string>
```

```ts [data-last]
pipe(
    ok(5),
    Result.map((x) => x * 2),
);
// Ok<number>
```

### mapErr

```ts
function Result.mapErr(
    result: Result<T, E>,
    transform: (error: E) => F
): Result<T, F>
```

Transforms the Err value using the `transform` function. If the result is an Err, applies the transform function to the error value and returns a new Err. If the result is Ok, returns it unchanged.

#### Example

```ts [data-first]
Result.mapErr(err("fail"), (e) => `Error: ${e}`);
// Err<string>("Error: fail")

Result.mapErr(ok(5), (e) => `Error: ${e}`);
// Ok<number>(5)
```

```ts [data-last]
pipe(
    err("fail"),
    Result.mapErr((e) => `Error: ${e}`),
);
// Err<string>("Error: fail")
```

### mapOr

```ts
function Result.mapOr(
    result: Result<T, E>,
    transform: (value: T) => U,
    fallback: F
): U | F
```

Unwraps the Ok value using the `transform` function, or returns the `fallback` value if the result is an Err.

#### Example

```ts [data-first]
Result.mapOr(ok(5), (x) => x * 2, 0);
// 10

Result.mapOr(err("fail"), (x) => x * 2, 0);
// 0
```

```ts [data-last]
pipe(
    ok(5),
    Result.mapOr((x) => x * 2, 0),
);
// 10
```

### mapOrElse

```ts
function Result.mapOrElse(
    result: Result<T, E>,
    transform: (value: T) => U,
    orElse: (error: E) => F
): U | F
```

Unwraps the Ok value using the `transform` function, or transforms the Err value using the `orElse` function.

#### Example

```ts [data-first]
Result.mapOrElse(
    ok(5),
    (x) => x * 2,
    (e) => `Error: ${e}`,
);
// 10

Result.mapOrElse(
    err("fail"),
    (x) => x * 2,
    (e) => `Error: ${e}`,
);
// "Error: fail"
```

```ts [data-last]
pipe(
    ok(5),
    Result.mapOrElse(
        (x) => x * 2,
        (e) => `Error: ${e}`,
    ),
);
// 10
```

### match

```ts
function Result.match(result: Result<T, E>, patterns: {
    Ok: (value: T) => A
    Err: (error: E) => B
}): A | B
```

Pattern matches on the `result` using the provided `patterns` object. Calls the `Ok` function if the result is Ok, or the `Err` function if the result is an Err.

#### Example

```ts [data-first]
Result.match(ok(5), {
    Ok: (x) => `Value: ${x}`,
    Err: (e) => `Error: ${e}`,
});
// "Value: 5"

Result.match(err("fail"), {
    Ok: (x) => `Value: ${x}`,
    Err: (e) => `Error: ${e}`,
});
// "Error: fail"
```

```ts [data-last]
pipe(
    ok(5),
    Result.match({
        Ok: (x) => `Value: ${x}`,
        Err: (e) => `Error: ${e}`,
    }),
);
// "Value: 5"
```

### or

```ts
function Result.or(
    a: Result<T, E>,
    b: Result<U, F>
): Result<T | U, F>
```

Performs a logical OR operation on two results. Returns `a` if it's Ok, otherwise returns `b`.

#### Example

```ts [data-first]
Result.or(ok(1), ok(2));
// Ok<number>(1)

Result.or(err("fail"), ok(2));
// Ok<number>(2)

Result.or(err("fail1"), err("fail2"));
// Err<string>("fail2")
```

```ts [data-last]
pipe(err("fail"), Result.or(ok(2)));
// Ok<number>(2)
```

### orElse

```ts
function Result.orElse(
    result: Result<T, E>,
    transform: (error: E) => Result<U, F>
): Result<T | U, F>
```

Uses a fallback result computed by `transform` if the current result is an Err. If the result is Ok, returns it unchanged. If the result is an Err, calls `transform` with the error value to produce an alternative result.

#### Example

```ts [data-first]
Result.orElse(ok(5), (e) => ok(0));
// Ok<number>(5)

Result.orElse(err("fail"), (e) => ok(0));
// Ok<number>(0)

Result.orElse(err("fail"), (e) => err(`Handled: ${e}`));
// Err<string>("Handled: fail")
```

```ts [data-last]
pipe(
    err("fail"),
    Result.orElse((e) => ok(0)),
);
// Ok<number>(0)
```

### unwrap

```ts
function Result.unwrap(result: Result<T, E>): T
```

Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with a default message.

#### Example

```ts [data-first]
Result.unwrap(ok(5));
// 5

Result.unwrap(err("fail"));
// throws ResultError("Called Err.unwrap()")
```

```ts [data-last]
pipe(ok(5), Result.unwrap());
// 5
```

### unwrapErr

```ts
function Result.unwrapErr(result: Result<T, E>): E
```

Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with a default message.

#### Example

```ts [data-first]
Result.unwrapErr(err("fail"));
// "fail"

Result.unwrapErr(ok(5));
// throws ResultError("Called Ok.unwrapErr()")
```

```ts [data-last]
pipe(err("fail"), Result.unwrapErr());
// "fail"
```

### unwrapOr

```ts
function Result.unwrapOr(result: Result<T, E>, or: U): T | U
```

Unwraps the Ok value from the `result`, or returns the `or` value if the result is an Err.

#### Example

```ts [data-first]
Result.unwrapOr(ok(5), 0);
// 5

Result.unwrapOr(err("fail"), 0);
// 0
```

```ts [data-last]
pipe(err("fail"), Result.unwrapOr(0));
// 0
```

### unwrapOrElse

```ts
function Result.unwrapOrElse(
    result: Result<T, E>,
    orElse: (error: E) => U
): T | U
```

Unwraps the Ok value from the `result`, or computes a fallback value using `orElse` if the result is an Err.

#### Example

```ts [data-first]
Result.unwrapOrElse(ok(5), (e) => 0);
// 5

Result.unwrapOrElse(err("fail"), (e) => `Default for ${e}`);
// "Default for fail"
```

```ts [data-last]
pipe(
    err("fail"),
    Result.unwrapOrElse((e) => `Default for ${e}`),
);
// "Default for fail"
```

## ResultAsync

### all

```ts
function ResultAsync.all(results: AwaitableResult<T, E>[]): ResultAsync<T[], E>
```

Combines multiple `results` into a single result. If all results are Ok, returns an Ok containing an array of all values. If any result is an Err, returns the first Err encountered.

#### Example

```ts
await ResultAsync.all([ok(1), ok(2), ok(3)]);
// Ok<number[]>([1, 2, 3])

await ResultAsync.all([ok(1), err("fail"), ok(3)]);
// Err<string>("fail")
```

### and

```ts
function ResultAsync.and(
    a: AwaitableResult<T, E>,
    b: AwaitableResult<U, F>
): ResultAsync<U, E | F>
```

Performs a logical AND operation on two results. Returns `b` if `a` is Ok, otherwise returns `a` (which must be an Err).

#### Example

```ts [data-first]
await ResultAsync.and(ok(1), ok("success"));
// Ok<string>("success")

await ResultAsync.and(err("fail"), ok("success"));
// Err<string>("fail")

await ResultAsync.and(ok(1), err("fail"));
// Err<string>("fail")
```

```ts [data-last]
await pipe(ok(1), ResultAsync.and(ok("success")));
// Ok<string>("success")
```

### andThen

```ts
function ResultAsync.andThen(
    result: AwaitableResult<T, E>,
    transform: (value: T) => AwaitableResult<U, F>
): ResultAsync<U, E | F>
```

Chains Result-returning operations. If the `result` is Ok, applies the `transform` function to its value. If the `result` is Err, returns the Err unchanged.

#### Example

```ts [data-first]
await ResultAsync.andThen(ok(5), (x) => ok(x * 2));
// Ok<number>(10)

await ResultAsync.andThen(err("fail"), (x) => ok(x * 2));
// Err<string>("fail")
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.andThen((x) => ok(x * 2)),
);
// Ok<number>(10)
```

### any

```ts
function ResultAsync.any(
    results: AwaitableResult<T, E>[]
): ResultAsync<T, E[]>
```

Returns the first Ok result from the array of `results`, or an Err containing an array of all errors if all results are Err.

#### Example

```ts
await ResultAsync.any([err("fail1"), ok(2), err("fail2")]);
// Ok<number>(2)

await ResultAsync.any([err("fail1"), err("fail2"), err("fail3")]);
// Err<string[]>(["fail1", "fail2", "fail3"])
```

### attempt

```ts
function ResultAsync.attempt<T>(
    unsafeFn: () => T | Promise<T>
): ResultAsync<T, unknown>
```

Wraps a function that may throw an exception in a Result. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, returns the error wrapped in Err.

#### Example

```ts
await ResultAsync.attempt(() => 5);
// Ok<number>(5)

await ResultAsync.attempt(() => {
    throw new Error("Something went wrong");
});
// Err<Error>(Error: Something went wrong)

await ResultAsync.attempt(() => JSON.parse('{"valid": true}'));
// Ok<object>({valid: true})
```

### attemptOr

```ts
function ResultAsync.attemptOr<T, U>(
    unsafeFn: () => T | Promise<U>,
    or: U | Promise<U>
): ResultAsync<T, U>
```

Wraps a function that may throw an exception in a Result, using a specific error value. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, returns the `or` value wrapped in Err.

#### Example

```ts
await ResultAsync.attemptOr(() => 5, "default error");
// Ok<number>(5)

await ResultAsync.attemptOr(() => {
    throw new Error("Something went wrong");
}, "default error");
// Err<string>("default error")

await ResultAsync.attemptOr(() => JSON.parse("invalid json"), "parse failed");
// Err<string>("parse failed")
```

### attemptOrElse

```ts
function ResultAsync.attemptOrElse<T, U>(
    unsafeFn: () => T | Promise<T>,
    orElse: (error: unknown) => U | Promise<U>
): ResultAsync<T, U>
```

Wraps a function that may throw an exception in a Result, transforming any caught error. If the `unsafeFn` executes successfully, returns its result wrapped in Ok. If it throws an error, transforms the error using `orElse` and returns it wrapped in Err.

#### Example

```ts
await ResultAsync.attemptOrElse(
    () => 5,
    (e) => `Error: ${e}`,
);
// Ok<number>(5)

await ResultAsync.attemptOrElse(
    () => {
        throw new Error("Something went wrong");
    },
    (e) => `Caught: ${e.message}`,
);
// Err<string>("Caught: Something went wrong")

await ResultAsync.attemptOrElse(
    () => JSON.parse("invalid json"),
    (e) => new Error("Failed to parse json", { cause: e }),
);
// Err<Error>(new Error("Failed to parse json", { cause: e }))
```

### expect

```ts
function ResultAsync.expect(
    result: AwaitableResult<T, E>,
    message: string
): Promise<T>
```

Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with the given `message`.

#### Example

```ts [data-first]
await ResultAsync.expect(ok(5), "Expected a value");
// 5

await ResultAsync.expect(err("fail"), "Expected a value");
// throws ResultError("Expected a value")
```

```ts [data-last]
await pipe(ok(5), ResultAsync.expect("Expected a value"));
// 5
```

### expectErr

```ts
function ResultAsync.expectErr(
    result: AwaitableResult<T, E>,
    message: string
): Promise<E>
```

Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with the given `message`.

#### Example

```ts [data-first]
await ResultAsync.expectErr(err("fail"), "Expected an error");
// "fail"

await ResultAsync.expectErr(ok(5), "Expected an error");
// throws ResultError("Expected an error")
```

```ts [data-last]
await pipe(err("fail"), ResultAsync.expectErr("Expected an error"));
// "fail"
```

### filter

```ts
function ResultAsync.filter(
    result: AwaitableResult<T, E>,
    predicate: (value: T) => boolean
): ResultAsync<T, E | void>
```

Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with `void`. If the result is already an Err, returns it unchanged.

Can be used for type narrowing.

#### Example

```ts [data-first]
await ResultAsync.filter(ok(5), (x) => x > 3);
// Ok<number>(5)

await ResultAsync.filter(ok(1), (x) => x > 3);
// Err<void>

await ResultAsync.filter(err("fail"), (x) => x > 3);
// Err<string>("fail")
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.filter((x) => x > 3),
);
// Ok<number>(5)
```

### filterOr

```ts
function ResultAsync.filterOr(
    result: AwaitableResult<T, E>,
    predicate: (value: T) => boolean,
    or: F
): ResultAsync<T, E | F>
```

Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, returns an Err with the `or` value. If the result is already an Err, returns it unchanged.

Can be used for type narrowing.

#### Example

```ts [data-first]
await ResultAsync.filterOr(ok(5), (x) => x > 3, "too small");
// Ok<number>(5)

await ResultAsync.filterOr(ok(1), (x) => x > 3, "too small");
// Err<string>("too small")

await ResultAsync.filterOr(err("fail"), (x) => x > 3, "too small");
// Err<string>("fail")
```

```ts [data-last]
await pipe(
    ok(1),
    ResultAsync.filterOr((x) => x > 3, "too small"),
);
// Err<string>("too small")
```

### filterOrElse

```ts
function ResultAsync.filterOrElse(
    result: AwaitableResult<T, E>,
    predicate: (value: T) => boolean,
    orElse: (value: T) => F | Promise<F>
): ResultAsync<T, E | F>
```

Filters the Ok value using the `predicate` function. If the result is Ok and the predicate returns true, returns the original result. If the predicate returns false, calls `orElse` with the Ok value and returns an Err with the result. If the result is already an Err, returns it unchanged.

Can be used for type narrowing.

#### Example

```ts [data-first]
await ResultAsync.filterOrElse(
    ok(5),
    (x) => x > 3,
    (x) => `${x} is too small`,
);
// Ok<number>(5)

await ResultAsync.filterOrElse(
    ok(1),
    (x) => x > 3,
    (x) => `${x} is too small`,
);
// Err<string>("1 is too small")

await ResultAsync.filterOrElse(
    err("fail"),
    (x) => x > 3,
    (x) => `${x} is too small`,
);
// Err<string>("fail")
```

```ts [data-last]
await pipe(
    ok(1),
    ResultAsync.filterOrElse(
        (x) => x > 3,
        (x) => `${x} is too small`,
    ),
);
// Err<string>("1 is too small")
```

### flip

```ts
function ResultAsync.flip(
    result: AwaitableResult<T, E>
): ResultAsync<E, T>
```

Swaps the Ok and Err values of the `result`. An Ok becomes an Err and an Err becomes an Ok.

#### Example

```ts [data-first]
await ResultAsync.flip(ok(5));
// Err<number>(5)

await ResultAsync.flip(err("fail"));
// Ok<string>("fail")
```

```ts [data-last]
await pipe(ok(5), ResultAsync.flip());
// Err<number>(5)
```

### inspect

```ts
function ResultAsync.inspect(
    result: AwaitableResult<T, E>,
    inspect: (value: T) => void
): ResultAsync<T, E>
```

Inspects the Ok value using the `inspect` function without changing the result. If the result is Ok, calls the inspect function with the value and returns the original result unchanged. If the result is an Err, returns it unchanged without calling inspect.

#### Example

```ts [data-first]
await ResultAsync.inspect(ok(5), (x) => console.log(`Value: ${x}`));
// Ok<number>(5) - logs "Value: 5"

await ResultAsync.inspect(err("fail"), (x) => console.log(`Value: ${x}`));
// Err<string>("fail") - no log
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.inspect((x) => console.log(`Value: ${x}`)),
);
// Ok<number>(5) - logs "Value: 5"
```

### inspectErr

```ts
function ResultAsync.inspectErr(
    result: AwaitableResult<T, E>,
    inspect: (error: E) => void
): ResultAsync<T, E>
```

Inspects the Err value using the `inspect` function without changing the result. If the result is an Err, calls the inspect function with the error value and returns the original result unchanged. If the result is Ok, returns it unchanged without calling inspect.

#### Example

```ts [data-first]
await ResultAsync.inspectErr(err("fail"), (e) => console.log(`Error: ${e}`));
// Err<string>("fail") - logs "Error: fail"

await ResultAsync.inspectErr(ok(5), (e) => console.log(`Error: ${e}`));
// Ok<number>(5) - no log
```

```ts [data-last]
await pipe(
    err("fail"),
    ResultAsync.inspectErr((e) => console.log(`Error: ${e}`)),
);
// Err<string>("fail") - logs "Error: fail"
```

### map

```ts
function ResultAsync.map(
    result: AwaitableResult<T, E>,
    transform: (value: T) => U | Promise<U>
): ResultAsync<U, E>
```

Transforms the value inside an Ok result using the `transform` function. If the `result` is an Err, it returns the Err unchanged.

#### Example

```ts [data-first]
await ResultAsync.map(ok(5), (x) => x * 2);
// Ok<number>

await ResultAsync.map(err("fail"), (x) => x * 2);
// Err<string>
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.map((x) => x * 2),
);
// Ok<number>
```

### mapErr

```ts
function ResultAsync.mapErr(
    result: AwaitableResult<T, E>,
    transform: (error: E) => F | Promise<F>
): ResultAsync<T, F>
```

Transforms the Err value using the `transform` function. If the result is an Err, applies the transform function to the error value and returns a new Err. If the result is Ok, returns it unchanged.

#### Example

```ts [data-first]
await ResultAsync.mapErr(err("fail"), (e) => `Error: ${e}`);
// Err<string>("Error: fail")

await ResultAsync.mapErr(ok(5), (e) => `Error: ${e}`);
// Ok<number>(5)
```

```ts [data-last]
await pipe(
    err("fail"),
    ResultAsync.mapErr((e) => `Error: ${e}`),
);
// Err<string>("Error: fail")
```

### mapOr

```ts
function ResultAsync.mapOr(
    result: AwaitableResult<T, E>,
    transform: (value: T) => U | Promise<U>,
    fallback: F
): Promise<U | F>
```

Unwraps the Ok value using the `transform` function, or returns the `fallback` value if the result is an Err.

#### Example

```ts [data-first]
await ResultAsync.mapOr(ok(5), (x) => x * 2, 0);
// 10

await ResultAsync.mapOr(err("fail"), (x) => x * 2, 0);
// 0
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.mapOr((x) => x * 2, 0),
);
// 10
```

### mapOrElse

```ts
function ResultAsync.mapOrElse(
    result: AwaitableResult<T, E>,
    transform: (value: T) => U | Promise<U>,
    orElse: (error: E) => F | Promise<F>
): Promise<U | F>
```

Unwraps the Ok value using the `transform` function, or transforms the Err value using the `orElse` function.

#### Example

```ts [data-first]
await ResultAsync.mapOrElse(
    ok(5),
    (x) => x * 2,
    (e) => `Error: ${e}`,
);
// 10

await ResultAsync.mapOrElse(
    err("fail"),
    (x) => x * 2,
    (e) => `Error: ${e}`,
);
// "Error: fail"
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.mapOrElse(
        (x) => x * 2,
        (e) => `Error: ${e}`,
    ),
);
// 10
```

### match

```ts
function ResultAsync.match(
    result: AwaitableResult<T, E>,
    patterns: {
        Ok: (value: T) => U | Promise<U>,
        Err: (error: E) => F | Promise<F>
    }
): Promise<U | F>
```

Pattern matches on the `result` using the provided `patterns` object. Calls the `Ok` function if the result is Ok, or the `Err` function if the result is an Err.

#### Example

```ts [data-first]
await ResultAsync.match(ok(5), {
    Ok: (x) => `Value: ${x}`,
    Err: (e) => `Error: ${e}`,
});
// "Value: 5"

await ResultAsync.match(err("fail"), {
    Ok: (x) => `Value: ${x}`,
    Err: (e) => `Error: ${e}`,
});
// "Error: fail"
```

```ts [data-last]
await pipe(
    ok(5),
    ResultAsync.match({
        Ok: (x) => `Value: ${x}`,
        Err: (e) => `Error: ${e}`,
    }),
);
// "Value: 5"
```

### or

```ts
function ResultAsync.or(
    a: AwaitableResult<T, E>,
    b: AwaitableResult<U, F>
): ResultAsync<T | U, F>
```

Performs a logical OR operation on two results. Returns `a` if it's Ok, otherwise returns `b`.

#### Example

```ts [data-first]
await ResultAsync.or(ok(1), ok(2));
// Ok<number>(1)

await ResultAsync.or(err("fail"), ok(2));
// Ok<number>(2)

await ResultAsync.or(err("fail1"), err("fail2"));
// Err<string>("fail2")
```

```ts [data-last]
await pipe(err("fail"), ResultAsync.or(ok(2)));
// Ok<number>(2)
```

### orElse

```ts
function ResultAsync.orElse(
    result: AwaitableResult<T, E>,
    orElse: (error: E) => AwaitableResult<U, F>
): ResultAsync<T | U, F>
```

Uses a fallback result computed by `transform` if the current result is an Err. If the result is Ok, returns it unchanged. If the result is an Err, calls `transform` with the error value to produce an alternative result.

#### Example

```ts [data-first]
await ResultAsync.orElse(ok(5), (e) => ok(0));
// Ok<number>(5)

await ResultAsync.orElse(err("fail"), (e) => ok(0));
// Ok<number>(0)

await ResultAsync.orElse(err("fail"), (e) => err(`Handled: ${e}`));
// Err<string>("Handled: fail")
```

```ts [data-last]
await pipe(
    err("fail"),
    ResultAsync.orElse((e) => ok(0)),
);
// Ok<number>(0)
```

### unwrap

```ts
function ResultAsync.unwrap(
    result: AwaitableResult<T, E>
): Promise<T>
```

Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with a default message.

#### Example

```ts [data-first]
await ResultAsync.unwrap(ok(5));
// 5

await ResultAsync.unwrap(err("fail"));
// throws ResultError("Called Err.unwrap()")
```

```ts [data-last]
await pipe(ok(5), ResultAsync.unwrap());
// 5
```

### unwrapErr

```ts
function ResultAsync.unwrapErr(
    result: AwaitableResult<T, E>
): Promise<E>
```

Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with a default message.

#### Example

```ts [data-first]
await ResultAsync.unwrapErr(err("fail"));
// "fail"

await ResultAsync.unwrapErr(ok(5));
// throws ResultError("Called Ok.unwrapErr()")
```

```ts [data-last]
await pipe(err("fail"), ResultAsync.unwrapErr());
// "fail"
```

### unwrapOr

```ts
function ResultAsync.unwrapOr(
    result: AwaitableResult<T, E>,
    or: U | Promise<U>
): Promise<T | U>
```

Unwraps the Ok value from the `result`, or returns the `or` value if the result is an Err.

#### Example

```ts [data-first]
await ResultAsync.unwrapOr(ok(5), 0);
// 5

await ResultAsync.unwrapOr(err("fail"), 0);
// 0
```

```ts [data-last]
await pipe(err("fail"), ResultAsync.unwrapOr(0));
// 0
```

### unwrapOrElse

```ts
function ResultAsync.unwrapOrElse(
    result: AwaitableResult<T, E>,
    orElse: (error: E) => U | Promise<U>
): Promise<T | U>
```

Unwraps the Ok value from the `result`, or computes a fallback value using `orElse` if the result is an Err.

#### Example

```ts [data-first]
await ResultAsync.unwrapOrElse(ok(5), (e) => 0);
// 5

await ResultAsync.unwrapOrElse(err("fail"), (e) => `Default for ${e}`);
// "Default for fail"
```

```ts [data-last]
await pipe(
    err("fail"),
    ResultAsync.unwrapOrElse((e) => `Default for ${e}`),
);
// "Default for fail"
```
