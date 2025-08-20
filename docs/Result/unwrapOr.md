# unwrapOr

```ts
function Result.unwrapOr(result: Result<T, E>, or: U): T | U
```

Unwraps the Ok value from the `result`, or returns the `or` value if the result is an Err.

## Example

::: code-group

```ts [data-first]
Result.unwrapOr(ok(5), 0);
// 5

Result.unwrapOr(err("fail"), 0);
// 0
```

```ts [data-last]
pipe(err("fail"), Result.unwrapOr(0));
// 0
```

:::
