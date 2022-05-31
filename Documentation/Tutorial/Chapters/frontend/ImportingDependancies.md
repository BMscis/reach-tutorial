<details>
<summary>
<h3>

Importing the dependencies.

</h3>

We need to import the [Reach Standard Library](https://docs.reach.sh/frontend/#js_stdlib.withDisconnect) module for JavaScript.
</summary>
<p>


```javascript
import { loadStdlib } from '@reach-sh/stdlib';
```
> `loadStdlib` is a function that will load the standard library dynamically based on the [`REACH_CONNECTOR_MODE`](https://docs.reach.sh/tool/#cmd_REACH_CONNECTOR_MODE) environment variable.

> You can also pass in a `REACH_CONNECTOR_MODE` variable directly to `loadStdlib` if you want to override the default.

```javascript
// connector can be 'ETH', 'ALGO', or 'CFX'
const stdlib = await loadStdlib("ALGO");
```

We also need to import the backend.

- Once we run :
```shell
./reach compile
```
Reach will trans pile the `index.rsh` file to `index.main.mjs` and output it to `build/index.main.mjs`. The `index.main.mjs` file will contain all the code we need to interact with our backend contract. We can now import `index.main.mjs` into our application

```javascript
import * as backend from './build/index.main.mjs';
```
</p>
</details>