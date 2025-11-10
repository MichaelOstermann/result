---
aside: true
---

# result

<Badge type="info" class="size">
    <span>Minified</span>
    <span>5.00 KB</span>
</Badge>

<Badge type="info" class="size">
    <span>Minzipped</span>
    <span>1.00 KB</span>
</Badge>

**Functional utilities for success | error types.**

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

::: code-group

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

## Tree-shaking

### Installation

::: code-group

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

:::

### Usage

::: code-group

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

:::

## Alternatives

- [supermacro/neverthrow](https://github.com/supermacro/neverthrow)
- [badrap/result](https://github.com/badrap/result)
- [cevr/ftld](https://github.com/cevr/ftld)
- [Borderliner/neverever](https://github.com/Borderliner/neverever)
- [biw/enwrap](https://github.com/biw/enwrap)
- [Snowflyt/tinyeffect](https://github.com/Snowflyt/tinyeffect)
