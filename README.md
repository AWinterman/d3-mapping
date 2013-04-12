a simple utility to make working with d3 scales easier.

# Installation #

npm install d3-Mapping

# Usage #

designed to be used node style:

```js
Mapping = require("d3-mapping")
```

Initialize a new mapping with a scale and an acessor function

```js
x = new Mapping(xScale, xAccessor)

```

x has convenience methods for a number of common tasks.


`x.place(d)` returns the value  a data element is mapped to
`x.create_domain(data)` will call `d3.extent(data, x.accessor)`
`x.axis()` creates an axis, and return it, so it can be used in a mehtod chain

