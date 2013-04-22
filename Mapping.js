// # d3-mapping.js #
//
// Mapping handles all the book-keeping required to map points 
// from the data space into coordinates of screen space.

''

// #### Exports the constructor function.
//  Usage: 
// ```js
// var mapping = new Mapping(d3.scale.linear(), accessor)
//
// function accessor(d){ 
//   return +d.dollars + (+d.cents)/100
// } 
// ```
module.exports = Mapping

// Depends on [d3.js](http://d3js.org/)
var d3 = require("d3")


// In the constructor I like to
// establish the shape of the class, and do any work that relies on being
// within the constructor's closure.
function Mapping(scale, accessor){

  // We're going to need the current `this` object.
  var self = this

  // Save the arguments to Mapping.
  self.scale = scale 
  self.accessor = accessor

  // Aliases for convenience-- the user calls `mapping.domain`, or
  // `mapping.range`.
  self.domain = self.scale.domain
  self.range = self.scale.range

  // `mapping.place` calls the accessor
  //  and then passes its results through the scale. 
  self.place = function(data_point){
    // D3 methods overwrite the `this` object, so, in order to maintain a
    // reference to `mapping`, I reference `self` from  the enclosing
    // scope.
    return self._place(this, data_point)
  } 

  // _axis_flag is a boolean to indicate whether we have already initialized an axis or not.
  self._axis_flag = false
  //it's common for the user to set max and min herself
}


// #### Bolierplate
// I use consistent terms for the constructor and the prototype across all
// Javascript class definitions.
var cons =  Mapping
  , proto = cons.prototype

proto.constructor = cons

// ## Method definitions

// #### mapping._place ###
// Maps the data point into the screen space. The leading underscore reminds
// users that they should use `mapping.place` over this method.

proto._place = function(elem, data_point){
  return this.scale(this.accessor(data_point))
}


// ## Axis helpers

// #### mapping.create_axis
// Create an axis for this.scale.
proto.create_axis = function(){
  this.axis = d3.svg.axis()
  this.axis.scale(this.scale)
  return this.axis
}


// #### mapping.axis
// a convenience function so the user only ever needs to call mapping.axis
proto.axis = function(){
  if(!this._axis_flag){
    this.create_axis()
  }
  return this.axis()
}


// ## Domain helpers


// #### mapping.min, mapping.max
// Set the max or min element of the data domain.
//
// This function will compute the max if provided an array, simply set it if
// provided with a single value, or if no argument is provided, it will return
// the value of the current maximum.
//
// Returned value depends on the number of arguments passed thise functions:
//
// * *1 argument*: the mapping object
// * *0 arguments*: the current bounds of the array
//
// max and min are essentially the same thing (modula the extrema), so the
// heavy lifting is done by `bound`, defined below,

proto.min(d){
  return bound(d, {idx: 0, func: d3.min})
}

proto.max(d){
  return bound(d, {idx: 1, func: d3.max})
}

// #### mapping.compute_domain
// Computes the extent of the data dimension associated with self mapping.
// If you specify `ordinal == true`, it will find the unique elements in the
// values returned by `mapping.accessor` rather
// than their extent.

proto.compute_domain = function(data, ordinal){
  var self = self
  var points = data.map(self.accessor)
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

function bound(d, w){
  var self = this
    , domain = self.domain()

  if(arguments.length = 0) {
    return domain()[w.idx]
  }

  if(!isNaN(d.length)) {
    domain[w.idx] = which.func(d, self.accessor)
  } else {
    domain[w.idx] = d
  }

  self.domain(domain)
  return self
}

