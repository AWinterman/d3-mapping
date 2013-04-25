A simple utility to make working with d3 scales easier.

# Installation #

npm install d3-Mapping

# Usage #

Designed to be used node style:

```js
var Mapping = require("d3-mapping")
```

Initialize a new mapping with a scale and an accessor function

```js
xScale = d3.scale.linear()
xAccessor = function(d){ return d.x }

x = new Mapping(xScale, xAccessor)
```

`x` has convenience methods for a number of common tasks. For example:

 - `x.scale` holds the reference to the original scale.
 - `x.place` will map data points onto the screen. It does a little dance with
   to prevent d3 from overwriting its `this` object, so you can use it in d3
   attribute setters.
 - `x.compute_domain(data, ordinal)` will compute the domain of `data`, set
   `ordinal == true` to find the unique elements for the dimension rather than
   the extent
 - `x.min`, `x.max` let you either set the min or max to their argument if you
   pass a single number, or if you pass an array they compute the mi or max of
   the array.



[Check out](http://awinterman.github.io/d3-mapping/example/) a working example,
or  [Read the literate source](http://awinterman.github.io/d3-mapping/docs/Mapping.html) for more info
