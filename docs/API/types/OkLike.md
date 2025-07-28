# OkLike

`OkLike<T>`

Represents a success that is either synchronous or asynchronous.

```ts
import type { OkLike } from "@monstermann/result";

type Example = OkLike<boolean, string>;
// type Example = Ok<string> | OkP<string>;
```
