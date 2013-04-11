a simple utility to make working with d3 scales easier.




## Usage ##


load the mapping function and make up some data
```js

var Mapping = require("d3-mapping")

var data = []
for(var i = 0, len = 10; i < len; ++i){
  data.push({x: Math.random(), y: Math.random})
}

pick your d3 scale, and define an accessor function

var x = new Mapping(d3.scale().linear, function(d){ return d.x })

var y = new Mapping(d3.scale().linear, function(d){ return d.y })

// define a domain and a range (note that `compute_domain` is not well behaved for
ordinal scales. This is an outstanding TODO):

x.compute_domain(data).range([0, 600])
y.compute_domain(data).range([600, 0])
```


