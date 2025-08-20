# ok

```ts
function ok(value: T): Ok<T>;
```

Creates an Ok result containing the given `value`. If the `value` is already a Result, it returns it unchanged.

## Example

```ts
ok();
// Ok<void>

ok(42);
// Ok<number>

ok("hello");
// Ok<string>

ok(ok(true));
// Ok<boolean>

ok(err("fail"));
// Err<string>
```
