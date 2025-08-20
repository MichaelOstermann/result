# or

```ts
function Result.or(
    a: Result<T, E>,
    b: Result<U, F>
): Result<T | U, F>
```

Performs a logical OR operation on two results. Returns `a` if it's Ok, otherwise returns `b`.

## Example

::: code-group

```ts [data-first]
Result.or(ok(1), ok(2));
// Ok<number>(1)

Result.or(err("fail"), ok(2));
// Ok<number>(2)

Result.or(err("fail1"), err("fail2"));
// Err<string>("fail2")
```

```ts [data-last]
pipe(err("fail"), Result.or(ok(2)));
// Ok<number>(2)
```

:::
