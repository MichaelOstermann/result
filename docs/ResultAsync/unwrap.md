# unwrap

```ts
function ResultAsync.unwrap(
    result: AwaitableResult<T, E>
): Promise<T>
```

Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with a default message.

## Example

::: code-group

```ts [data-first]
await ResultAsync.unwrap(ok(5));
// 5

await ResultAsync.unwrap(err("fail"));
// throws ResultError("Called Err.unwrap()")
```

```ts [data-last]
await pipe(ok(5), ResultAsync.unwrap());
// 5
```

:::
