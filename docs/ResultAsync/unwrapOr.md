# unwrapOr

```ts
function ResultAsync.unwrapOr(
    result: AwaitableResult<T, E>,
    or: U | Promise<U>
): Promise<T | U>
```

Unwraps the Ok value from the `result`, or returns the `or` value if the result is an Err.

## Example

::: code-group

```ts [data-first]
await ResultAsync.unwrapOr(ok(5), 0);
// 5

await ResultAsync.unwrapOr(err("fail"), 0);
// 0
```

```ts [data-last]
await pipe(err("fail"), ResultAsync.unwrapOr(0));
// 0
```

:::
