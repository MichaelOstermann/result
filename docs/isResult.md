# isResult

```ts
function isResult(value: unknown): value is Result;
```

Returns `true` if the `value` is a Result (either Ok or Err), `false` otherwise.

## Example

```ts
isResult(ok(42));
// true

isResult(err("fail"));
// true

isResult(42);
// false

isResult("hello");
// false
```
