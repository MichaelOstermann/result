# andThen

`andThen(result, fn)`

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
