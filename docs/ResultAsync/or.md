# or

```ts
function ResultAsync.or(
    a: AwaitableResult<T, E>,
    b: AwaitableResult<U, F>
): ResultAsync<T | U, F>
```

Performs a logical OR operation on two results. Returns `a` if it's Ok, otherwise returns `b`.

## Example

::: code-group

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

:::
