function draw_linechart(data){
    $('.linechart1SVG').remove();
    console.log(data)

    var margin = {top: 20, right: 20, bottom: 50, left: 30},
      width = $('#linechart1').width() - margin.left - margin.right,
      height = $('#linechart1').height() - margin.top - margin.bottom;

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {

        return "<strong>" + d.key + "</strong>";
      })

    var svg = d3.select("#linechart1")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class","linechart1SVG");

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%H"));

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(function(d){return Math.pow(d,1)});

    var line = d3.svg.line()
        .x(function(d) { return x(d.Time); })
        .y(function(d) { return y(Math.pow(d.number,1)); })
        .interpolate("basis");

    x.domain([
        d3.min(data, function(c) { return d3.min(c.values, function(d) { return d.Time; }); }),
        d3.max(data, function(c) { return d3.max(c.values, function(d) { return d.Time; }); })
      ]);

    y.domain([
        d3.min(data, function(c) { return d3.min(c.values, function(d) { return Math.pow(d.number,1); }); }),
        d3.max(data, function(c) { return d3.max(c.values, function(d) { return Math.pow(d.number,1); }); })
      ]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    g.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis)
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .style("text-anchor", "end")
        .text("Number");

      var category = g.selectAll(".category")
        .data(data)
        .enter().append("g")
          .attr("class", "category");

      category.append("path")
          .attr("class", "linechart")
          .attr("d", function(d) { return line(d.values); })
          .style("stroke", function(d) { return z(d.key); })
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

      svg.call(tip);
}

function linechart_Filter(Category_Arr){
  var linechart_selection = d3.selectAll('.linechart');
  if(Category_Arr.length == 0)
    linechart_selection.style('opacity',1);
  else{
        // smBarchart_selection.style('fill-opacity',.3);

      linechart_selection.style('opacity',function(d){
        console.log(d)
        if(Category_Arr.indexOf(d.key) == -1)
          return .1;
        else
          return 1;
      });
  }
}
