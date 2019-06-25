
var width = 400,
height = 200,
radius = Math.min(width, height) / 2;
var data = [
    {age: '<50', population: 2704659},
    {age: '>50', population: 4499890}
    
];
var color = d3.scale.ordinal()
.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
.outerRadius(radius - 10)
.innerRadius(0);

var pie = d3.layout.pie()
.sort(null)
.value(function(d) { return d.population; });

var svg = d3.select("#pie").append("svg")
.attr("width", '100%')
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


data.forEach(function(d) {
d.population = +d.population;
});

var g = svg.selectAll(".arc")
  .data(pie(data))
  .enter().append("g")
  .attr("class", "arc");

g.append("path")
  .attr("d", arc)
  .attr("data-legend", function(d) { return d.data.age; })
  .attr("data-legend-pos", function(d, i) { return i; })
  .style("fill", function(d) { return color(d.data.age); });

g.append("text")
  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  .attr("dy", ".35em")
  .style("text-anchor", "middle");

var padding = 20,
legx = radius + padding,
legend = svg.append("g")
.attr("class", "legend")
.attr("transform", "translate(" + legx + ", 0)")
.style("font-size", "12px")
.call(d3.legend);