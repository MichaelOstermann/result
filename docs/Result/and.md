# and

```ts
function Result.and(
    a: Result<T, E>,
    b: Result<U, F>
): Result<U, E | F>
```

Performs a logical AND operation on two results. Returns `b` if `a` is Ok, otherwise returns `a` (which must be an Err).

## Example

::: code-group

```ts [data-first]
Result.and(ok(1), ok("success"));
// Ok<string>("success")

Result.and(err("fail"), ok("success"));
// Err<string>("fail")

Result.and(ok(1), err("fail"));
// Err<string>("fail")
```

```ts [data-last]
pipe(ok(1), Result.and(ok("success")));
// Ok<string>("success")
```

:::
