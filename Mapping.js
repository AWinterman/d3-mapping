// Mapping handles all the book-keeping required to map points 
// from the data space into coordinates of screen space.
module.exports = Mapping

// #### Exports the constructor function.
//  Usage: 
// ```js
// var mapping = new Mapping(d3.scale.linear(), accessor)
//
// function accessor(d){ 
//   return +d.dollars + (+d.cents)/100
// } 
// ```

function Mapping(scale, accessor){

  var self = this

  self.scale = scale 
  self.accessor = accessor

  self.domain = self.scale.domain
  self.range = self.scale.range

  // `mapping.place` calls `mapping._place` with the data point. This is
  // necessary because D3 methods overwrite the `this` object, in function
  // calls.  In order to maintain a reference to the `mapping` object, we
  // simply use  `self` from  the enclosing scope.
  self.place = function(data_point){
    return self._place(data_point)
  } 
}

var cons =  Mapping
  , proto = cons.prototype

proto.constructor = cons

// #### mapping._place ###
// Maps the data point into the screen space. The leading underscore reminds
// users that they should use `mapping.place` over this method.
proto._place = function(data_point){
  return this.scale(this.accessor(data_point))
}

// #### mapping.create_axis
// Create an axis for `mapping.scale`.
proto.create_axis = function(){
  this.axis = d3.svg.axis()
  this.axis.scale(this.scale)
  return this.axis
}

// #### mapping.min, mapping.max
// Set the max or min element of the data domain.
//
// This function will compute the max if provided an array, set it if
// provided with a single value, or if no argument is provided, it will return
// the value of the current maximum.
//
// Returned value depends on the number of arguments passed thise functions:
//
// * *1 argument*: the mapping object
// * *0 arguments*: the current bounds of the array
//
// max and min are essentially the same thing (modula the extrema), so they are
// extracted away into the function `bound`, defined below,
proto.min = function(d){
  return bound(this, d, {idx: 0, func: d3.min})
}
proto.max = function(d){
  return bound(this, d, {idx: 1, func: d3.max})
}


// #### mapping.compute_domain
// Computes the extent of the data dimension associated with this `mapping`.
// If you specify `ordinal == true`, it will find the unique elements in the
// values returned by `mapping.accessor` rather
// than their extent.
proto.compute_domain = function(data, ordinal){
  if (!data) {
    throw Error("data is " + data)
  }
  var self = this
    , points = data.map(self.accessor)
 
  if (ordinal){
    self.domain(d3.set(points).values())
  } else {
    self.domain(d3.extent(points))
  }
  return self.scale
}

// #### bound 
// Bound takes two arguments and impliments functionality described for
// `mapping.min` and `mapping.max`.
function bound(self, d, w){
  if(d === undefined) {
    return self.domain()[w.idx]
  }

  if(!isNaN(d.length)) {
    self.domain()[w.idx] = w.func(d, self.accessor)
  } else {
    self.domain()[w.idx] = d
  }

  return self
}
