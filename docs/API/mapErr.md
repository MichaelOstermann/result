# mapErr

`mapErr(result, fn)`

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
