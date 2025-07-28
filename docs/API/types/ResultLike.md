# ResultLike

`ResultLike<T, E>`

Represents a success or error that is either synchronous or asynchronous.

```ts
import type { ResultLike } from "@monstermann/result";

type Example = ResultLike<boolean, string>;
// type Example = Result<boolean, string> | ResultP<boolean, string>;
```
