# result

[![bundle][bundle-src]][bundle-href]

**Functional utilities for success | error types.**

## Features

- **Lightweight:** Only ~800 bytes minified and gzipped.
- **Library-agnostic:** Uses simple `{ ok: true, value }` / `{ ok: false, error }` objects.
- **Composable and modular:** Pick and use only the functions you need, no need to adopt the whole library.
- **Flexible API:** Functions support both "data-first" and "data-last" signatures for seamless use with `pipe` and functional programming styles.
- **Async-friendly:** Functions work interchangeably with both synchronous and asynchronous results.
- **Well-tested:** 200+ unit tests ensure reliability and correctness.

## Examples

**Sync**

::: code-group

```ts [data-first]
import { ok, mapOk, okOrThrow } from "@monstermann/result";

const a = ok(0); //=> { ok: true, value: 0 }
const b = mapOk(input, (num) => num + 1); //=> { ok: true, value: 1 }
const c = okOrThrow(b); //=> 1
```

```ts [data-last]
import { ok, mapOk, okOrThrow } from "@monstermann/result"
import { pipe } from "remeda"

pipe(
    ok(0),
    mapOk((num) => num + 1)),
    okOrThrow()
)
```

:::

**Async**

::: code-group

```ts [data-first]
import { okP, mapOk, okOrThrow } from "@monstermann/result";

const a = okP(0); //=> Promise<{ ok: true, value: 0 }>
const b = mapOk(input, async (num) => num + 1); //=> Promise<{ ok: true, value: 1 }>
const c = await okOrThrow(b); //=> 1
```

```ts [data-last]
import { okP, mapOk, okOrThrow } from "@monstermann/result";
import { pipe } from "remeda"

await pipe(
    okP(0),
    mapOk(async (num) => num + 1)),
    okOrThrow()
)
```

:::

## Installation

::: code-group

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

:::

## Overview

### Types

The core types of this library are:

::: code-group

```ts [sync]
interface Ok<T> {
    readonly ok: true;
    readonly value: T;
    readonly error?: undefined;
}

interface Err<T> {
    readonly ok: false;
    readonly value?: undefined;
    readonly error: T;
}

type Result<T, E> = Ok<T> | Err<E>;
```

```ts [async]
// Async signatures are suffixed with `P`, standing for `Promise`.

type OkP<T> = Promise<Ok<T>>;

type ErrP<T> = Promise<Err<T>>;

type ResultP<T, E> = Promise<Result<T, E>>;
```

```ts [mixed]
type OkLike<T> = Ok<T> | OkP<T>;

type ErrLike<T> = Err<T> | ErrP<T>;

type ResultLike<T, E> = Result<T, E> | ResultP<T, E>;
```

:::

### Values

Since this library acts upon regular objects and promises, you can construct values for any `Result` type on your own however you wish, some examples:

::: code-group

```ts [sync]
import type { Result } from "@monstermann/result";
import { ok, err } from "@monstermann/result";

// Creating your own records: // [!code highlight]

const example: Result<boolean, string> = condition
    ? { ok: true, value: true }
    : { ok: false, value: "message" };

// Using `ok` and `err`: // [!code highlight]

const example2: Result<boolean, string> = condition ? ok(true) : err("message");

example.value; // boolean | undefined
example.error; // string | undefined

if (example.ok) {
    example.value; // boolean
} else {
    example.error; // string
}
```

```ts [async]
import type { ResultP } from "@monstermann/result";
import { ok, err, okP, errP } from "@monstermann/result";

// Using `new Promise`: // [!code highlight]

const example: ResultP<boolean, string> = new Promise(function (resolve) {
    if (condition) resolve({ ok: true, value: true });
    else resolve({ ok: false, error: "message" });
});

// Using `new Promise` + `ok` and `err`: // [!code highlight]

const example2: ResultP<boolean, string> = new Promise(function (resolve) {
    if (condition) resolve(ok(true));
    else resolve(err("message"));
});

// Using `Promise.resolve`: // [!code highlight]

const example3: ResultP<boolean, string> = condition
    ? Promise.resolve({ ok: true, value: true })
    : Promise.resolve({ ok: false, error: "message" });

// Using `Promise.resolve` + `ok` and `err`: // [!code highlight]

const example4: ResultP<boolean, string> = condition
    ? Promise.resolve(ok(value))
    : Promise.resolve(err(value));

// Using `okP` and `errP`: // [!code highlight]

const example4: ResultP<boolean, string> = condition
    ? okP(true)
    : errP("message");
```

:::

### Usage

Similarly, these plain records and promises are often more than enough for simple scenarios. The utilities this library provides are entirely optional for you to use, and you can easily create your own:

::: code-group

```ts [sync]
import type { Result } from "@monstermann/result";
import { ok, err } from "@monstermann/result";

const result: Result<boolean, string> = condition ? ok(true) : err("message");

result.value; // boolean | undefined
result.error; // string | undefined

if (result.ok) {
    result.value; // boolean
} else {
    result.error; // string
}
```

```ts [async]
import type { ResultP } from "@monstermann/result";
import { okP, errP } from "@monstermann/result";

const resultP: ResultP<boolean, string> = condition
    ? okP(true)
    : errP("message");

// Using `Promise.then`: // [!code highlight]

resultP.then(function (result) {
    result.value; // boolean | undefined
    result.error; // string | undefined

    if (result.ok) {
        result.value; // boolean
    } else {
        result.error; // string
    }
});

// Using `await`: // [!code highlight]

await resultP.value; // boolean | undefined
await resultP.error; // string | undefined

const result = await resultP;

if (result.ok) {
    result.value; // boolean
} else {
    result.error; // string
}
```

:::

## Alternatives

- [supermacro/neverthrow](https://github.com/supermacro/neverthrow)
- [badrap/result](https://github.com/badrap/result)
- [cevr/ftld](https://github.com/cevr/ftld)
- [Borderliner/neverever](https://github.com/Borderliner/neverever)
- [biw/enwrap](https://github.com/biw/enwrap)
- [Snowflyt/tinyeffect](https://github.com/Snowflyt/tinyeffect)

## API

### `Ok<T>`

Represents a synchronous success.

```ts
import type { Ok } from "@monstermann/result";

type Example = Ok<boolean>;

// type Example = {
//     readonly ok: true
//     readonly value: boolean
//     readonly error?: undefined
// }
```

### `Err<T>`

Represents a synchronous error.

```ts
import type { Err } from "@monstermann/result";

type Example = Err<boolean>;

// type Example = {
//     readonly ok: false
//     readonly value?: undefined
//     readonly error: boolean
// }
```

### `Result<T, E>`

Represents a synchronous success or error.

```ts
import type { Result } from "@monstermann/result";

type Example = Result<boolean, string>;
// type Example = Ok<boolean> | Err<string>;
```

### `OkP<T>`

Represents an asynchronous success.

```ts
import type { OkP } from "@monstermann/result";

type Example = OkP<boolean>;

// type Example = Promise<{
//     readonly ok: true
//     readonly value: boolean
//     readonly error?: undefined
// }>
```

### `ErrP<T>`

Represents an asynchronous error.

```ts
import type { ErrP } from "@monstermann/result";

type Example = ErrP<boolean>;

// type Example = Promise<{
//     readonly ok: false
//     readonly value?: undefined
//     readonly error: boolean
// }>
```

### `ResultP<T, E>`

Represents an asynchronous success or error.

```ts
import type { ResultP } from "@monstermann/result";

type Example = ResultP<boolean, string>;
// type Example = OkP<boolean> | ErrP<string>;
```

### `OkLike<T>`

Represents a success that is either synchronous or asynchronous.

```ts
import type { OkLike } from "@monstermann/result";

type Example = OkLike<boolean, string>;
// type Example = Ok<string> | OkP<string>;
```

### `ErrLike<T>`

Represents an error that is either synchronous or asynchronous.

```ts
import type { ErrLike } from "@monstermann/result";

type Example = ErrLike<boolean, string>;
// type Example = Err<string> | ErrP<string>;
```

### `ResultLike<T, E>`

Represents a success or error that is either synchronous or asynchronous.

```ts
import type { ResultLike } from "@monstermann/result";

type Example = ResultLike<boolean, string>;
// type Example = Result<boolean, string> | ResultP<boolean, string>;
```

### `InferOk<T>`

Extracts `Ok` values from any combination of results, including asynchronous ones:

```ts
import type { InferOk, Result, Ok } from "@monstermann/result";

// boolean | string
type Example = InferOk<Ok<boolean> | Result<string, string>>;
```

### `InferErr<T>`

Extracts `Err` values from any combination of results, including asynchronous ones:

```ts
import type { InferErr, Result, Err } from "@monstermann/result";

// boolean | string
type Example = InferErr<Err<boolean> | Result<string, string>>;
```

### `SimplifyResult<T>`

Takes any combination of `Result` types and simplifies its representation.

```ts
import type { SimplifyResult, Ok, Err, Result } from "@monstermann/result";

// Ok<boolean>
type A = SimplifyResult<Result<boolean, never>>;

// Err<boolean>
type B = SimplifyResult<Result<never, boolean>>;

// Result<boolean | number, string | void>
type C = SimplifyResult<
    Ok<true> | Ok<false> | Ok<number> | Err<string> | Err<void>
>;
```

### `ok(value)`

- Casts `T` into `Ok<T>`
- Casts `Promise<T>` into `OkP<T>`
- Forwards any `Result` type as-is

```ts
ok(true); //=> Ok<boolean>
ok(Promise.resolve(true)); //=> OkP<boolean>
ok(ok(true)); //=> Ok<boolean>
ok(err(true)); //=> Err<boolean>
ok(okP(true)); //=> OkP<boolean>
ok(errP(true)); //=> ErrP<boolean>
```

### `okP(value)`

- Casts `T` into `OkP<T>`
- Casts `Promise<T>` into `OkP<T>`
- Casts other `Result` types into their async counterparts

This can be particularly helpful to cast a `Result` into a `ResultP`, which enables the asynchronous signatures of most utilities.

```ts
ok(true); //=> OkP<boolean>
ok(Promise.resolve(true)); //=> OkP<boolean>
ok(ok(true)); //=> OkP<boolean>
ok(err(true)); //=> ErrP<boolean>
ok(okP(true)); //=> OkP<boolean>
ok(errP(true)); //=> ErrP<boolean>
```

### `err(value)`

- Casts `T` into `Err<T>`
- Casts `Promise<T>` into `ErrP<T>`
- Forwards any `Result` type as-is

```ts
err(true); //=> Err<boolean>
err(Promise.resolve(true)); //=> ErrP<boolean>
err(ok(true)); //=> Ok<boolean>
err(err(true)); //=> Err<boolean>
err(okP(true)); //=> OkP<boolean>
err(errP(true)); //=> ErrP<boolean>
```

### `errP(value)`

- Casts `T` into `ErrP<T>`
- Casts `Promise<T>` into `ErrP<T>`
- Casts other `Result` types into their async counterparts

```ts
errP(true); //=> ErrP<boolean>
errP(Promise.resolve(true)); //=> ErrP<boolean>
errP(ok(true)); //=> OkP<boolean>
errP(err(true)); //=> ErrP<boolean>
errP(okP(true)); //=> OkP<boolean>
errP(errP(true)); //=> ErrP<boolean>
```

### `isOk(value)`

A function that takes an `unknown` value and narrows it to `Ok<unknown>`.

::: code-group

```ts [data-first]
isOk(ok(true)); //=> true
isOk(err(false)); //=> false
isOk(true); //=> false
```

```ts [data-last]
pipe(ok(true), isOk()); //=> true
pipe(err(false), isOk()); //=> false
pipe(true, isOk()); //=> false
```

:::

### `isErr(value)`

A function that takes an `unknown` value and narrows it to `Err<unknown>`.

::: code-group

```ts [data-first]
isErr(ok(true)); //=> false
isErr(err(false)); //=> true
isErr(true); //=> false
```

```ts [data-last]
pipe(ok(true), isErr()); //=> false
pipe(err(false), isErr()); //=> true
pipe(true, isErr()); //=> false
```

:::

### `isResult(value)`

A function that takes an `unknown` value and narrows it to `Result<unknown, unknown>`.

::: code-group

```ts [data-first]
isResult(ok(true)); //=> true
isResult(err(false)); //=> true
isResult(true); //=> false
```

```ts [data-last]
pipe(ok(true), isResult()); //=> true
pipe(err(false), isResult()); //=> true
pipe(true, isResult()); //=> false
```

:::

### `mapOk(result, fn)`

Transforms a `Result<T, E>` into a `Result<U, E>` by applying the given function to the `Ok` value.

If the result is an `Err`, it is returned unchanged.

::: code-group

```ts [data-first]
mapOk(ok(0), (num) => num + 1); //=> ok(1)
mapOk(okP(0), async (num) => num + 1); //=> okP(1)
```

```ts [data-last]
pipe(
    ok(0),
    mapOk((num) => num + 1),
); //=> ok(1)

pipe(
    okP(0),
    mapOk(async (num) => num + 1),
); //=> okP(1)
```

:::

### `mapErr(result, fn)`

Transforms a `Result<T, E>` into a `Result<T, U>` by applying the given function to the `Err` value.

If the result is an `Ok`, it is returned unchanged.

::: code-group

```ts [data-first]
mapErr(err(0), (num) => num + 1); //=> err(1)
mapErr(errP(0), async (num) => num + 1); //=> errP(1)
```

```ts [data-last]
pipe(
    err(0),
    mapErr((num) => num + 1),
); //=> err(1)

pipe(
    errP(0),
    mapErr(async (num) => num + 1),
); //=> errP(1)
```

:::

### `andThen(result, fn)`

Transforms a `Result` into another one by applying the provided function to the `Ok` value and returning its result as-is.

If the result is an `Err`, it is returned unchanged.

::: code-group

```ts [data-first]
andThen(ok(0), (num) => ok(num + 1)); //=> ok(1)
andThen(ok(0), (num) => err(num + 1)); //=> err(1)
andThen(okP(0), async (num) => ok(num + 1)); //=> okP(1)
andThen(okP(0), async (num) => err(num + 1)); //=> errP(1)
andThen(okP(0), async (num) => okP(num + 1)); //=> okP(1)
andThen(okP(0), async (num) => errP(num + 1)); //=> errP(1)
```

```ts [data-last]
pipe(
    ok(0),
    andThen((num) => ok(num + 1)),
); //=> ok(1)

pipe(
    ok(0),
    andThen((num) => err(num + 1)),
); //=> err(1)

pipe(
    okP(0),
    andThen(async (num) => ok(num + 1)),
); //=> okP(1)

pipe(
    okP(0),
    andThen(async (num) => err(num + 1)),
); //=> errP(1)

pipe(
    okP(0),
    andThen(async (num) => okP(num + 1)),
); //=> okP(1)

pipe(
    okP(0),
    andThen(async (num) => errP(num + 1)),
); //=> errP(1)
```

:::

### `orElse(result, fn)`

Transforms a `Result` into another one by applying the provided function to the `Err` value and returning its result as-is.

If the result is an `Ok`, it is returned unchanged.

::: code-group

```ts [data-first]
orElse(err(0), (num) => ok(num + 1)); //=> ok(1)
orElse(err(0), (num) => err(num + 1)); //=> err(1)
orElse(errP(0), async (num) => ok(num + 1)); //=> okP(1)
orElse(errP(0), async (num) => err(num + 1)); //=> errP(1)
orElse(errP(0), async (num) => okP(num + 1)); //=> okP(1)
orElse(errP(0), async (num) => errP(num + 1)); //=> errP(1)
```

```ts [data-last]
pipe(
    err(0),
    orElse((num) => ok(num + 1)),
); //=> ok(1)

pipe(
    err(0),
    orElse((num) => err(num + 1)),
); //=> err(1)

pipe(
    errP(0),
    orElse(async (num) => ok(num + 1)),
); //=> okP(1)

pipe(
    errP(0),
    orElse(async (num) => err(num + 1)),
); //=> errP(1)

pipe(
    errP(0),
    orElse(async (num) => okP(num + 1)),
); //=> okP(1)

pipe(
    errP(0),
    orElse(async (num) => errP(num + 1)),
); //=> errP(1)
```

:::

### `tapOk(result, fn)`

Allows you to peek into the `Ok` value of a `Result`, triggering a side-effect while ignoring the output.

If the result is an `Err`, this has no effect.

::: code-group

```ts [data-first]
tapOk(ok(true), (v) => console.log(v)); //=> ok(true)
tapOk(okP(true), async (v) => console.log(v)); //=> ok(true)
```

```ts [data-last]
pipe(ok(true), (v) => console.log(v)); //=> ok(true)
pipe(okP(true), async (v) => console.log(v)); //=> ok(true)
```

:::

### `tapErr(result, fn)`

Allows you to peek into the `Err` value of a `Result`, triggering a side-effect while ignoring the output.

If the result is an `Ok`, this has no effect.

::: code-group

```ts [data-first]
tapErr(err("message"), (msg) => console.log(msg)); //=> err("message")
tapErr(errP("message"), async (msg) => console.log(msg)); //=> err("message")
```

```ts [data-last]
pipe(err("message"), (msg) => console.log(msg)); //=> err("message")
pipe(errP("message"), async (msg) => console.log(msg)); //=> err("message")
```

:::

### `okOr(result, fallback)`

Extracts the `Ok` value from a `Result`, otherwise returns the fallback.

::: code-group

```ts [data-first]
okOr(ok(true), false); //=> true
okOr(err(false), true); //=> true
await okOr(okP(true), Promise.resolve(false)); //=> true
await okOr(errP(false), Promise.resolve(true)); //=> true
```

```ts [data-last]
pipe(ok(true), okOr(false)); // true
pipe(err(false), okOr(true)); // true
await pipe(okP(true), okOr(Promise.resolve(false))); // true
await pipe(errP(false), okOr(Promise.resolve(true))); // true
```

:::

### `okOrElse(result, fn)`

Extracts the `Ok` value from a `Result`, otherwise applies the `Err` value to the given function and returns its output.

::: code-group

```ts [data-first]
okOrElse(ok(true), () => false); //=> true
okOrElse(err(false), (error) => true); //=> true
await okOrElse(okP(true), async () => false); //=> true
await okOrElse(errP(false), async (error) => true); //=> true
```

```ts [data-last]
pipe(
    ok(true),
    okOrElse((error) => false),
); //=> true

pipe(
    err(false),
    okOrElse((error) => true),
); //=> true

await pipe(
    okP(true),
    okOrElse(async () => true),
); //=> true

await pipe(
    errP(false),
    okOrElse(async (error) => true),
); //=> true
```

:::

### `okOrThrow(result)`

Extracts the `Ok` value from a `Result`, otherwise throws the `Err` value.

::: code-group

```ts [data-first]
okOrThrow(ok(true)); //=> true
okOrThrow(err("message")); // Throws "message"
await okOrThrow(okP(true)); //=> true
await okOrThrow(errP("message")); // Throws "message"
```

```ts [data-last]
pipe(ok(true), okOrThrow()); //=> true
pipe(err("message"), okOrThrow()); // Throws "message"
await pipe(okP(true), okOrThrow()); //=> true
await pipe(errP("message"), okOrThrow()); // Throws "message"
```

:::

[bundle-src]: https://img.shields.io/bundlephobia/minzip/%40monstermann/result?style=flat&colorA=080f12&colorB=3451b2&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=%40monstermann/result
