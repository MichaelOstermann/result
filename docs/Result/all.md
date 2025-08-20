# all

```ts
function Result.all(results: Result<T, E>[]): Result<T[], E>
```

Combines multiple `results` into a single result. If all results are Ok, returns an Ok containing an array of all values. If any result is an Err, returns the first Err encountered.

## Example

```ts
Result.all([ok(1), ok(2), ok(3)]);
// Ok<number[]>([1, 2, 3])

Result.all([ok(1), err("fail"), ok(3)]);
// Err<string>("fail")
```
