# expectErr

```ts
function ResultAsync.expectErr(
    result: AwaitableResult<T, E>,
    message: string
): Promise<E>
```

Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with the given `message`.

## Example

::: code-group

```ts [data-first]
await ResultAsync.expectErr(err("fail"), "Expected an error");
// "fail"

await ResultAsync.expectErr(ok(5), "Expected an error");
// throws ResultError("Expected an error")
```

```ts [data-last]
await pipe(err("fail"), ResultAsync.expectErr("Expected an error"));
// "fail"
```

:::
