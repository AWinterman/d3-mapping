A simple utility to make working with d3 scales easier.

# Installation #

npm install d3-Mapping

# Usage #

Designed to be used node style:

```js
var Mapping = require("d3-mapping")
```

Initialize a new mapping with a scale and an acessor function

```js
x = new Mapping(xScale, xAccessor)

```

`x` has convenience methods for a number of common tasks. 

Check out some [example](./example) usage, and [read te
docs!](./docs/Mapping.html)
