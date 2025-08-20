# unwrapErr

```ts
function Result.unwrapErr(result: Result<T, E>): E
```

Unwraps the Err value from the `result`. If the result is an Ok, throws a ResultError with a default message.

## Example

::: code-group

```ts [data-first]
Result.unwrapErr(err("fail"));
// "fail"

Result.unwrapErr(ok(5));
// throws ResultError("Called Ok.unwrapErr()")
```

```ts [data-last]
pipe(err("fail"), Result.unwrapErr());
// "fail"
```

:::
