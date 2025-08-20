# unwrapOrElse

```ts
function Result.unwrapOrElse(
    result: Result<T, E>,
    orElse: (error: E) => U
): T | U
```

Unwraps the Ok value from the `result`, or computes a fallback value using `orElse` if the result is an Err.

## Example

::: code-group

```ts [data-first]
Result.unwrapOrElse(ok(5), (e) => 0);
// 5

Result.unwrapOrElse(err("fail"), (e) => `Default for ${e}`);
// "Default for fail"
```

```ts [data-last]
pipe(
    err("fail"),
    Result.unwrapOrElse((e) => `Default for ${e}`),
);
// "Default for fail"
```

:::
