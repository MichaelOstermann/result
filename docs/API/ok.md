# ok

`ok(value)`

- Casts `T` into `Ok<T>`
- Casts `Promise<T>` into `OkP<T>`
- Forwards any `Result` type as-is

```ts
ok(true); //=> Ok<boolean>
ok(Promise.resolve(true)); //=> OkP<boolean>
ok(ok(true)); //=> Ok<boolean>
ok(err(true)); //=> Err<boolean>
ok(okP(true)); //=> OkP<boolean>
ok(errP(true)); //=> ErrP<boolean>
```
