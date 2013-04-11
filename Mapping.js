module.exports = Mapping

function Mapping(scale, accessor){
  //defines a base object which handles all the information around mapping from
  //the data space to the screen space

  //map `this` to a variable so we can refer to it inside of other function
  //closures
  var self = this

  self.scale = scale 
  self.accessor = accessor

  //aliases for convenience
  self.domain = self.scale.domain
  self.range = self.scale.range

  self.place = function(data_point){
    //the `this` object of functions called 
    //    `selection.<method>(<arg1>, functions)` 
    //is overwritten, hence this little dance with _place.
    return self._place(this, data_point)
  } 

  self.axis = null
}

var cons = Mapping
  , proto = cons.prototype

proto.constructor = cons

proto._place = function(elem, data_point){
  //maps the data point into the screen space
  return this.scale(this.accessor(data_point))
}

proto.compute_domain = function(data){
  //computes the extent of the data dimension associated with this mapping.

  //TODO: add support for discrete data
  var self = this
  self.domain(d3.extent(data, self.accessor))
  return self.scale
}

proto.create_axis = function(){
  //create an axis for this scale
  this.axis = d3.svg.axis()
  this.axis.scale(this.scale)
  return this.axis
})
