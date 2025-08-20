# flip

```ts
function ResultAsync.flip(
    result: AwaitableResult<T, E>
): ResultAsync<E, T>
```

Swaps the Ok and Err values of the `result`. An Ok becomes an Err and an Err becomes an Ok.

## Example

::: code-group

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

:::
