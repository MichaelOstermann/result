# mapOk

`mapOk(result, fn)`

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
