# unwrapErr

```ts
function ResultAsync.unwrapErr(
    result: AwaitableResult<T, E>
): Promise<E>
```

Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with a default message.

## Example

::: code-group

```ts [data-first]
await ResultAsync.unwrapErr(err("fail"));
// "fail"

await ResultAsync.unwrapErr(ok(5));
// throws ResultError("Called Ok.unwrapErr()")
```

```ts [data-last]
await pipe(err("fail"), ResultAsync.unwrapErr());
// "fail"
```

:::
