function CalendarHeatmap(results, legend_arr){

	var cal = new CalHeatMap();

	cal.init({
		itemSelector: "#calendar",
		data: results,
		//dataType: "csv",
		start: new Date(2016, 8, 1),
		// minDate: new Date(2016, 9),
		// maxDate: new Date(2016, 11),
		//afterLoadData: DataProcess,
		domain: "month",
		subDomain: "x_day",
		cellSize: 20, 
		subDomainTextFormat: "%d",
		range: 1,	//how many months
		domainGutter: 10, //Space between each domain
		domainMargin: 10,
		displayLegend: true,
		nextSelector: "#heatmap-next",
		previousSelector: "#heatmap-previous",
		label: {
			position: "top"
		}, //Use .graph-label to style the label.
		legend: legend_arr,
		legendCellSize: 17,
		// legendColors: {
		// 	empty: "#ededed",
		// 	min: "#40ffd8",
		// 	max: "#f20013"
		// }
	});

	var legendText = d3.select(".cal-heatmap-container")
	  	.selectAll('.legendText')
	    .data(legend_arr)
	    .enter().append("g");

	legendText.append("text")
	    .attr("class","legendText")
	    .attr("x",function(d,i){return 10+i*20;})
	    .attr("y",175)
	    .attr("width",3)
	    .attr("height",3)
	    .style({"fill":"#000", "font-size":"8px"})
	    .text(function(d){return parseInt(d);});

	d3.selectAll('.graph-rect').style('cursor','pointer')
		.on('click',function(d){
			linechart_Date_Filter(new Date(d.t))
		});
}

function linechart_Date_Filter(mydate){
	d3.csv("data/linechart1.csv", function(d) {
		// console.log(d.Time.substr(0,2))
		  d.Date = parseDate(d.Date);
		  d.Time = parseTime(d.Time);
		  d.number = +d.number;
		  return d;

		}, function(error, data) {
		  if (error) throw error;

	  	var expensesByDate = d3.nest()
		  .key(function(d) { return d.Date; })
		  .entries(data);

		var subarr;

		expensesByDate.forEach(function(e){
			if(e.key == mydate)
				subarr = e.values;
		})
		console.log(subarr)
		  var expensesByCategory = d3.nest()
			  .key(function(d) { return d.Catogory; })
			  .entries(subarr);

		  function sortByTimeAscending(a, b) {
		    return a.Time - b.Time;
		  }
		  expensesByCategory.forEach(function(e){
				e.values = e.values.sort(sortByTimeAscending);
		  })
		  // console.log(expensesByCategory)
		  draw_linechart(expensesByCategory);

	});
}