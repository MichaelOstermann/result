# unwrap

```ts
function Result.unwrap(result: Result<T, E>): T
```

Unwraps the Ok value from the `result`. If the result is an Err, throws a ResultError with a default message.

## Example

::: code-group

```ts [data-first]
Result.unwrap(ok(5));
// 5

Result.unwrap(err("fail"));
// throws ResultError("Called Err.unwrap()")
```

```ts [data-last]
pipe(ok(5), Result.unwrap());
// 5
```

:::
