A simple utility to make working with d3 scales easier.

# Installation #

npm install d3-Mapping

# Usage #

Designed to be used node style:

```js
Mapping = require("d3-mapping")
```

Initialize a new mapping with a scale and an acessor function

```js
x = new Mapping(xScale, xAccessor)

```

x has convenience methods for a number of common tasks.


- `x.place(d)` returns the value  a data element is mapped to. `x.place` will
  dodge d3's reassignment of the `this` object, so you are free to use within
  `.attr` assignments, etc.
- `x.create_domain(data)` will call `d3.extent(data, x.accessor)`. Currently
  doesn't support ordinal scales.
- `x.create_axis()` creates an axis for the scale, and return it, so it can be
  used in a method chain.
- axis and scale attributes can be set or accessed via `x.axis` and `x.scale`
  respectively.

Check out [the example](./example).
