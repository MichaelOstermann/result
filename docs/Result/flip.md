# flip

```ts
function Result.flip(result: Result<T, E>): Result<E, T>
```

Swaps the Ok and Err values of the `result`. An Ok becomes an Err and an Err becomes an Ok.

## Example

::: code-group

```ts [data-first]
Result.flip(ok(5));
// Err<number>(5)

Result.flip(err("fail"));
// Ok<string>("fail")
```

```ts [data-last]
pipe(ok(5), Result.flip());
// Err<number>(5)
```

:::
