# err

`err(value)`

- Casts `T` into `Err<T>`
- Casts `Promise<T>` into `ErrP<T>`
- Forwards any `Result` type as-is

```ts
err(true); //=> Err<boolean>
err(Promise.resolve(true)); //=> ErrP<boolean>
err(ok(true)); //=> Ok<boolean>
err(err(true)); //=> Err<boolean>
err(okP(true)); //=> OkP<boolean>
err(errP(true)); //=> ErrP<boolean>
```
