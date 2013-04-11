var Mapping = require("../d3-mapping");

// define canvas
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//add the canvas to the DOM
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// initialize Mapping with the d3 scale you'd like and an accessor function,
// which take an element of your data array and returns the value you are
// mapping to this dimension
var x = new Mapping(d3.time.scale(), function(d){return d3.time.format("%d-%b-%y").parse(d.date)})
var y = new Mapping(d3.scale.linear(), function(d){return +d.close})

//set the ranges
x.range([0, width]);
y.range([height, 0]);

//create some axes. (calls d3.svg.axis)
x.create_axis().orient("bottom")
y.create_axis().orient("left")

var area = d3.svg.area()
    .x( x.place)
    .y0(height)
    .y1(y.place);


d3.tsv("data.tsv", function(error, data) {

  // compute the domains: 
  // (i.e. just call x.domain(d3.extent(data, x.accessor))
  // support for ordinal scales is forthcoming

  x.compute_domain(data);
  y.compute_domain(data);

  // but we actually want the y.domain to range to zero
  y.domain([0, y.domain()[1]])

  // if you ever need to access other features of the scale, they're available
  // via x.scale.<attr>

  svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(x.axis);

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

