# okP

`okP(value)`

- Casts `T` into `OkP<T>`
- Casts `Promise<T>` into `OkP<T>`
- Casts other `Result` types into their async counterparts

This can be particularly helpful to cast a `Result` into a `ResultP`, which enables the asynchronous signatures of most utilities.

```ts
ok(true); //=> OkP<boolean>
ok(Promise.resolve(true)); //=> OkP<boolean>
ok(ok(true)); //=> OkP<boolean>
ok(err(true)); //=> ErrP<boolean>
ok(okP(true)); //=> OkP<boolean>
ok(errP(true)); //=> ErrP<boolean>
```
