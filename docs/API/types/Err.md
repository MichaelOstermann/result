# Err

`Err<T>`

Represents a synchronous error.

```ts
import type { Err } from "@monstermann/result";

type Example = Err<boolean>;

// type Example = {
//     readonly ok: false
//     readonly value?: undefined
//     readonly error: boolean
// }
```
