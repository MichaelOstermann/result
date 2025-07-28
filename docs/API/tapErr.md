# tapErr

`tapErr(result, fn)`

Allows you to peek into the `Err` value of a `Result`, triggering a side-effect while ignoring the output.

If the result is an `Ok`, this has no effect.

::: code-group

```ts [data-first]
tapErr(err("message"), (msg) => console.log(msg)); //=> err("message")
tapErr(errP("message"), async (msg) => console.log(msg)); //=> err("message")
```

```ts [data-last]
pipe(err("message"), (msg) => console.log(msg)); //=> err("message")
pipe(errP("message"), async (msg) => console.log(msg)); //=> err("message")
```

:::
