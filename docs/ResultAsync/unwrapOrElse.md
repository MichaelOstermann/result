# unwrapOrElse

```ts
function ResultAsync.unwrapOrElse(
    result: AwaitableResult<T, E>,
    orElse: (error: E) => U | Promise<U>
): Promise<T | U>
```

Unwraps the Ok value from the `result`, or computes a fallback value using `orElse` if the result is an Err.

## Example

::: code-group

```ts [data-first]
await ResultAsync.unwrapOrElse(ok(5), (e) => 0);
// 5

await ResultAsync.unwrapOrElse(err("fail"), (e) => `Default for ${e}`);
// "Default for fail"
```

```ts [data-last]
await pipe(
    err("fail"),
    ResultAsync.unwrapOrElse((e) => `Default for ${e}`),
);
// "Default for fail"
```

:::
