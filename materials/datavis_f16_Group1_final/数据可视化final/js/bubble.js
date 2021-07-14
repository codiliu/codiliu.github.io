function draw_bubble(data){
	// console.log(data)
	var width = $('#bubble').width(),
		height = $('#bubble').height(), //max size of the bubbles
    	color = d3.scale.category20(); //color category

	var bubble = d3.layout.pack()
	    .sort(null)
	    .size([width, height])
	    .padding(1.5);

	var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>" + d.Category + "</strong><br/><span style='color:#fff'>" + d.number + "</span>";
        });

	var svg = d3.select("#bubble")
	    .append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .attr("class", "bubble");

    //convert numerical values from strings to numbers
    data = data.map(function(d){ d.value = +d["number"]; return d; });

    //bubbles needs very specific format, convert data to this.
    var nodes = bubble.nodes({children:data}).filter(function(d) { return !d.children; });

    //setup the chart
    var bubbles = svg.append("g")
        .attr("transform", "translate(0,0)")
        .selectAll(".bubble")
        .data(nodes)
        .enter();

    //create the bubbles
    bubbles.append("circle")
        .attr("class","circle_bubble")
        .attr("r", function(d){ return d.r; })
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; })
        .style("fill", function(d) { return color(d.value); })
         .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

    //format the text for each bubble
    bubbles.append("text")
        .attr("x", function(d){ return d.x; })
        .attr("y", function(d){ return d.y + 5; })
        .attr("text-anchor", "middle")
        .text(function(d){ 
        	if(d.r>10)
        		return d["Category"].substr(0,5); 
        })
        .style({
            "fill":"white", 
            "font-size": "7px"
        });

    svg.call(tip);
}

function bubble_Filter(Category_Arr){
  var bubble_selection = d3.selectAll('.circle_bubble');
  if(Category_Arr.length == 0)
    bubble_selection.style('fill-opacity',1);
  else{
        // smBarchart_selection.style('fill-opacity',.3);

      bubble_selection.style('fill-opacity',function(d){
        console.log(d)
        if(Category_Arr.indexOf(d.Category) == -1)
          return .3;
        else
          return 1;
      });
  }
}

// function draw_linechart_total(data){
//     // console.log(data)
//     var svg = d3.select("#linechart2_svg"),
//       margin = {top: 20, right: 20, bottom: 30, left: 50},
//       width = $('#linechart2').width() - margin.left - margin.right,
//       height = $('#linechart2').height() - margin.top - margin.bottom,
//       g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
//    var x = d3.time.scale()
//         .range([0, width]);

//     var y = d3.scale.linear()
//         .range([height, 0]);

//     var xAxis = d3.svg.axis()
//         .scale(x)
//         .orient("bottom")
//         .tickFormat(d3.time.format("%H"));

//     var yAxis = d3.svg.axis()
//         .scale(y)
//         .orient("left");

//     var line = d3.svg.line()
//         .x(function(d) { return x(d.Time); })
//         .y(function(d) { return y(d.number); })
//         .interpolate("basis");

//     x.domain(d3.extent(data, function(d) { return d.Time; }));
//     y.domain(d3.extent(data, function(d) { return d.number; }));

//     g.append("g")
//         .attr("class", "axis axis--x")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);

//     g.append("g")
//         .attr("class", "axis axis--y")
//         .call(yAxis)
//       .append("text")
//         .attr("fill", "#000")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", "0.71em")
//         .style("text-anchor", "end")
//         .text("Number");

//     g.append("path")
//         .datum(data)
//         .attr("class", "line")
//         .attr("d", line);
//         // .on('mouseover', function(d){
//         //     div.transition()    
//         //         .duration(200)    
//         //         .style("opacity", .9);    

//         //     div .html("Total number")  
//         //         .style("left", (d3.event.pageX) + "px")   
//         //         .style("top", (d3.event.pageY - 28) + "px");  
//         //   })
//         //   .on('mouseout', function(d){
//         //     div.transition()   
//         //         .duration(500)    
//         //         .style("opacity", 0); 
//         //   });
// }
