---
aside: true
---

# result

<Badge type="info" class="size">
    <span>Minified</span>
    <span>1.67 KB</span>
</Badge>

<Badge type="info" class="size">
    <span>Minzipped</span>
    <span>516 B</span>
</Badge>

**Functional utilities for success | error types.**

## Features

- **Lightweight:** Only ~500 bytes minified and gzipped.
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
