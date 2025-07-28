# ErrLike

`ErrLike<T>`

Represents an error that is either synchronous or asynchronous.

```ts
import type { ErrLike } from "@monstermann/result";

type Example = ErrLike<boolean, string>;
// type Example = Err<string> | ErrP<string>;
```
