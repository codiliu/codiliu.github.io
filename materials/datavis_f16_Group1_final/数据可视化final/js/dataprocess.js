// var ribbon_arr = [];
// var format_arr = [];

var parseTime = d3.time.format("%H").parse;
var parseDate = d3.time.format("%m/%d/%Y").parse;

var z = d3.scale.category20();

// d3.csv("data/TimeSet.csv", function(d) {
// 	  d.Time = parseTime(d.Time);
// 	  d.number = +d.number;
// 	  return d;

// 	}, function(error, data) {
// 	  if (error) throw error;
// 	  function sortByDateAscending(a, b) {
// 	    // Dates will be cast to numbers automagically:
// 	    return a.Time - b.Time;
// 	  }

// 	  data = data.sort(sortByDateAscending);
// 	  draw_linechart_total(data);

// });

d3.csv("data/DayOfWeekSet.csv", function(error, data) {
	  if (error) throw error;
	  // var obj = new Object();
	  // data.forEach(function(dd){
	  // 	obj[dd.DayOfWeek.substr(0,3)] = +dd.number;
	  // })
	  // console.log(obj);
	  draw_starplot(data);

});
draw_All_linechart();

function draw_All_linechart(){
	// console.log(draw_linechart)
	d3.csv("data/linechart2.csv", function(d) {
	  d.Time = parseTime(d.Time);
	  d.number = +d.number;
	  return d;

	}, function(error, data) {
	  if (error) throw error;

	  var expensesByCategory = d3.nest()
		  .key(function(d) { return d.Category; })
		  .entries(data);

	  function sortByTimeAscending(a, b) {
	    return a.Time - b.Time;
	  }
	  expensesByCategory.forEach(function(e){
			e.values = e.values.sort(sortByTimeAscending);
	  })
	  draw_linechart(expensesByCategory);

	});
}

d3.csv("data/DateSet.csv", function(d) {
	  d.Date = parseDate(d.Date).getTime()/1000;
	  d.number = +d.number;
	  return d;

	}, function(error, data) {
	  if (error) throw error;

	  function sortByNumAscending(a, b) {
	    return b.number - a.number;
	  }
	  data = data.sort(sortByNumAscending);
	  var results = new Object();
	  data.forEach(function(dd){
	  	results[dd.Date] = dd.number;
	  })
	  // console.log(results);

	  var legend_arr = [];
	  // console.log(data[0].number);
	  // console.log(data[data.length-1].number)
	  var delta = (data[0].number - data[data.length-1].number)/5;
	  for(var i=1;i<5;i++){
			legend_arr.push(data[data.length-1].number+i*delta);
	  }

	  CalendarHeatmap(results, legend_arr);
});

d3.csv("data/PdDistrictCatogorySet.csv",function(d) {
	  d.number = +d.number;
	  return d;

	},function(error, data){
	if(error) throw error;

	var Catogory_Arr;

	var expensesByPdDistrict = d3.nest()
	  .key(function(d) { return d.PdDistrict; })
	  .entries(data);

	var expensesByCatogory = d3.nest()
	  .key(function(d) { return d.Catogory; })
	  .entries(data);

	function sortByNumAscending(a, b) {
	    return a.number - b.number;
    }
    // console.log(expensesByPdDistrict.length)
    expensesByPdDistrict.forEach(function(e){
		e.values = e.values.sort(sortByNumAscending);
    })

    d3.csv("data/CategorySet.csv",function(error,c_data){
		c_data = c_data.sort(sortByNumAscending);
		Catogory_Arr = c_data.map(function(d) { return d.Category; });
		draw_smBarchart(expensesByPdDistrict,Catogory_Arr);
		draw_bubble(c_data);
    })
})

$('#showAll').on("click",function(d){
	draw_All_linechart();
})
