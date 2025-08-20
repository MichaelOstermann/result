# and

```ts
function ResultAsync.and(
    a: AwaitableResult<T, E>,
    b: AwaitableResult<U, F>
): ResultAsync<U, E | F>
```

Performs a logical AND operation on two results. Returns `b` if `a` is Ok, otherwise returns `a` (which must be an Err).

## Example

::: code-group

```ts [data-first]
await ResultAsync.and(ok(1), ok("success"));
// Ok<string>("success")

await ResultAsync.and(err("fail"), ok("success"));
// Err<string>("fail")

await ResultAsync.and(ok(1), err("fail"));
// Err<string>("fail")
```

```ts [data-last]
await pipe(ok(1), ResultAsync.and(ok("success")));
// Ok<string>("success")
```

:::
