# orElse

`orElse(result, fn)`

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
