# Result

`Result<T, E>`

Represents a synchronous success or error.

```ts
import type { Result } from "@monstermann/result";

type Example = Result<boolean, string>;
// type Example = Ok<boolean> | Err<string>;
```
