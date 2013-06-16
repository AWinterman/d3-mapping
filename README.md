# d3-Mapping #
[![Build Status](https://secure.travis-ci.org/AWinterman/d3-mapping.png)](http://travis-ci.org/AWinterman/d3-mapping) 

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
 - `x.range` and `x.domain` provide convenient access to `x.scale.domain` and
   `x.scale.range`
 - `x.place` will map data points onto the screen. It does a little dance
   to prevent D3 from overwriting its `this` object, so you can use it in d3
   attribute setters.
 - `x.compute_domain(data, ordinal)` will compute the domain of `data`, set
   `ordinal == true` to find the unique elements for the dimension rather than
   the extent
 - `x.min` and `x.max` give more flexibility in manipulating the domain of the
   mapping. If you provide one argument, the minimum (maximum) of the mapping
   domain is simply set to that argument. If you
   pass an array, they compute the minimum or maximum of the value returned by the
   accessor when applied to the array, and set the corresponding bound of
   the domain.



[Check out](http://awinterman.github.io/d3-mapping/example/) a working example,
or  [Read the literate source](http://awinterman.github.io/d3-mapping/docs/Mapping.html) for more info
