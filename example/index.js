var Mapping = require("../Mapping")
  , d3 = require("d3")

// Define canvas.
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Add the canvas to the DOM
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Initialize Mapping with the d3 scale you'd like and an accessor function,
// which take an element of your data array and returns the value you are
// mapping to this dimension.
var x = new Mapping(d3.time.scale(), function(d){return d3.time.format("%d-%b-%y").parse(d.date)})
var y = new Mapping(d3.scale.linear(), function(d){return +d.close})

// Set the ranges.
x.range([0, width]);
y.range([height, 0]);

// Create some axes. (calls d3.svg.axis).
x.create_axis().orient("bottom")
y.create_axis().orient("left")

var area = d3.svg.area()
    .x(x.place)
    .y0(height)
    .y1( y.place);


d3.tsv("data.tsv", function(error, data) {

  // Compute the domains: 
  x.compute_domain(data);
  y.compute_domain(data);

  // but we actually want the y.domain to range to zero.
  y.min(0)

  // if you ever need to access other features of the scale, they're available
  // via `x.scale.<attr>`.

  // Drawing the graph.
  svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

  // Add the x axis. 
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(x.axis);

  // Add the y axis, and it's labels
  svg.append("g")
      .attr("class", "y axis")
      .call(y.axis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");
});

