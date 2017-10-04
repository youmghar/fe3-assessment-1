

var svg = d3.select("svg"), // This part saves the sizes of the svg
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y%m%d"); //This will parse the time data in the right way

var x = d3.scaleTime()
    .rangeRound([0, width]);// This scales the time on the x-axis from 0 to the max width

var y = d3.scaleLinear()
    .rangeRound([height, 0]);// This scales the temperature on the y-axis linearly

var line = d3.line()
    .x(function(d) { return x(d.date); }) //This will save the coordinates the path will follow for the line
    .y(function(d) { return y(d.temp); });

d3.csv("temperature.csv", function(d) { //This loads in the data
  d.date = parseTime(d.date);
  d.temp = +d.temp;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.temp; }));

  
  g.append("g")//This part appends the x-axis
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .select(".domain")
      .remove();

  g.append("g")//This part appends the y-axis
      .call(d3.axisLeft(y)) 
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

  g.append("path")//This part appends the graphline
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
});