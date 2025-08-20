# err

```ts
function err(error: E): Err<E>;
```

Creates an Err result containing the given `error`. If the `error` is already a Result, it returns it unchanged.

## Example

```ts
err();
// Err<void>

err("failed");
// Err<string>

err(404);
// Err<number>

err(ok(true));
// Ok<boolean>

err(err("fail"));
// Err<string>
```
