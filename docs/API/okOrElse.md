# okOrElse

`okOrElse(result, fn)`

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
