var Mapping = require("./Mapping")
  , test = require("tape")
  , d3 = require("d3")

var a = 10130
  , b = 3900
  , ordinal_data = ['hi', 'blue', 'yellow', 'green']
  , data = make_some_data(a, b, ordinal_data)

// The numbers above are chosen at random ^^

var M = new Mapping(d3.scale.linear(), accessor) 
  , D = new Mapping(d3.scale.ordinal(), ordinal_accessor)

// okay, now we're going to make sure all the methods just work:

test("A method throws for continuous data", function(t) {
  t.plan(5)

  t.doesNotThrow(
    function(){
     M.domain([0,1])
    }, "Setting the domain." )

  t.doesNotThrow(function(){
    M.create_axis()
  }, "Creating an axis.")
  t.doesNotThrow(function(){
    M.min(-10)
  }, "Setting the minimum value")
  t.doesNotThrow(function(){
    M.max(10)
  }, "Setting the maximum value")
  t.doesNotThrow(function(){
    M.compute_domain(data)
  }, "Computing the domain from the data")
})

test("A method throws for discrete data", function(t) {
  t.plan(5)
  t.doesNotThrow(
    function(){
     D.domain([0,1])
    }, "Setting the domain." )

  t.doesNotThrow(function(){
    D.create_axis()
  }, "Creating an axis.")
  t.doesNotThrow(function(){
    D.min(-10)
  }, "Setting the minimum value")
  t.doesNotThrow(function(){
    D.max(10)
  }, "Setting the maximum value")
  t.doesNotThrow(function(){
    D.compute_domain(data)
  }, "Computing the domain from the data")
})

test("Domains are computed correctly for continuous data.", function(t){
  t.plan(2)

  M.compute_domain(data)

  var continuous_domain = M.domain()

  t.equal(continuous_domain[0], b)
  t.equal(continuous_domain[1], a)
})

test("Domains are computed correctly for discrete data.", function(t){

  t.plan(5)
  D.compute_domain(data, true)

   var discrete_domain = D.domain()
     , n = discrete_domain.length
     , m = ordinal_data.length

  ordinal_data.sort()
  discrete_domain.sort()

  t.equal(n, m, "same number of elements in both pieces")

  for (var i = 0; i < ordinal_data.length; ++i){
    t.equal(ordinal_data[i], discrete_domain[i], ordinal_data[i] +", "+ discrete_domain[i])
  }

})

// TODO: figure out how to write the below for D
test("Mapping.place does the right thing for both M", function(t){
  t.plan(2)
  
  var points = data.slice(0, 1).concat(data.slice(-1))

  M.compute_domain(data)
  M.range([-10, 10])

  t.equal(M.place(points[0]), 10)
  t.equal(M.place(points[1]), -10)
})


function make_some_data(a, b, ordinal_data) {
  // given a range for datas, make some datas in that range
  var datas = []
    , val
    , choice

  for (var i = 0; i <= 100; ++i){
    val = a + ((b-a)/100)*i 
    choice = i % ordinal_data.length 
    datas.push({val: val, color: ordinal_data[choice]})
  }

  return datas
}

function accessor(d) {
  return d.val
}

function ordinal_accessor(d) {
  return d.color
}
