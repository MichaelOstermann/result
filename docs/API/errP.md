# errP

`errP(value)`

- Casts `T` into `ErrP<T>`
- Casts `Promise<T>` into `ErrP<T>`
- Casts other `Result` types into their async counterparts

```ts
errP(true); //=> ErrP<boolean>
errP(Promise.resolve(true)); //=> ErrP<boolean>
errP(ok(true)); //=> OkP<boolean>
errP(err(true)); //=> ErrP<boolean>
errP(okP(true)); //=> OkP<boolean>
errP(errP(true)); //=> ErrP<boolean>
```
