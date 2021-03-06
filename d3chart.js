$('.openbtn').on('click' , function() {
    $('#sidebar').css('left', 0).addClass('overlay');
    $('body').addClass('stop-scroll');
})
$('.closebtn').on('click' , function() {
    $('#sidebar').css('left', '-100%');
    $('body').removeClass('stop-scroll');
})

var margin = {
        top: 30,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function (d) {
        return x(d.date);
    })
    .y(function (d) {
        return y(d.close);
    });

// Adds the svg canvas
var svg = d3.select("#line-chart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// Get the data
var data = [{
        date: '1-May-12',
        close: 58.13
    },
    {
        date: '30-Apr-12',
        close: 53.13
    },
    {
        date: '25-Apr-12',
        close: 57.13
    },
    {
        date: '22-Apr-12',
        close: 69.13
    },
    {
        date: '21-Mar-12',
        close: 73.13
    },
    {
        date: '19-Mar-12',
        close: 89.13
    },
    {
        date: '11-Feb-12',
        close: 83.13
    }
]

    data.forEach(function (d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.close;
    })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);