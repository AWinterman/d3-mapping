// Basically just going to test that these run, and then that the domain
// functions work properly
var d3 = require("d3")
  , Mapping = require("./Mapping")
  , assert = require("assert")


var data = []
data.length = 100

for (var i = 0, len = data.length; i < len; ++i){
  data[i] = {}
  data[i].count = Math.random() * 100 + 300
  data[i].population = Math.random * 1000 + 400
  data[i].time = i
}


var min = {count: 0, population: 10, time: -1}
  , max = {count: 1, population: 1e10, time: -2}

data.push(min)
data.push(max)



var x = new Mapping(d3.scale.linear(), accessor)

assert(x)
assert(x.min)
assert(x.max)

assert.deepEqual(x.min(data).max(data).domain(), [accessor(min), accessor(max)])

assert.deepEqual(x.min(1).max(2).domain(), [1, 2])
assert.deepEqual(x.compute_domain(data).domain(),  [accessor(min), accessor(max)])



function accessor(d){ return d.count / d.population }


