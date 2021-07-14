brushStart=Date.parse("11/25/2016 00:00");
brushEnd=Date.parse("11/26/2016 00:00");
cities=[]
quakePoints=[]
var drawTimeline=function(data){
	  	//console.log(data)
	  	var format = d3.time.format("%Y/%m/%d");
/*	  	minList=d3.max(function())
	  	maxList=data[data.length-1].height+1
	  	rangeList=maxList-minList
*/		
		var maxY=d3.max(data,function(d){
	  		return d.value;
	  	})
	  	var minX=d3.min(data,function(d){
	  		return d.time;
	  	})
	  	var maxX=d3.max(data,function(d){
	  		return d.time;
	  	})
	  	var timeInterval=data[1].time - data[0].time;

		var timeWidth=data.length

	  	var width = $("#timeline").width();
	  	var height = $("#timeline").height();
	  	//在 body 里添加一个 SVG 画布	
	  	var svg = d3.select("#timeline")
	  		.append("svg")
	  		.attr("width", width)
	  		.attr("height", height);
	  	//画布周边的空白
	  	var padding = {left:50, right:50, top:2, bottom:55};
	  	//x轴的比例尺
	  	var xScale = d3.time.scale()
	  		.domain(d3.extent(data,function(d){
	  			return d.time;
	  		}))
	  		.rangeRound([0, width - padding.left - padding.right]);

	  //	console.log(d3.max(data, function(d) { return d.num; }))

	  	var yScale = d3.scale.linear()
	  		.domain([0,d3.max(data,function(d){
	  			return d.value;
	  		})])
	  		.range([height - padding.top - padding.bottom, 0]);
	  	//定义x轴
	  	var xAxis = d3.svg.axis()
	  		.scale(xScale)
	  		.orient("bottom")
	  		.ticks(20)
	  	
	  	//定义y轴
	  	var yAxis = d3.svg.axis()
	  		.scale(yScale)
	  		.orient("left")
	  		.ticks(5)
	  		.tickSubdivide(5);

	  	//添加x轴
	  	svg.append("g")
	  		.attr("class","axis")
	  		.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
	  		.call(xAxis); 
	  	//添加y轴
	  	svg.append("g")
	  		.attr("class","axis")
	  		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
	  		.call(yAxis);

	  	//矩形之间的空白
	  	var rectPadding = 1;
	  	//添加矩形元素
	  	var barWidth=(width - padding.left - padding.right)*0.85/timeWidth;

	  	var rects = svg.selectAll(".MyRect")
	  		.data(data)
	  		.enter()
	  		.append("rect")
	  		.attr("class","MyRect")
	  		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
	  		.attr("x", function(d,i){
	  			return xScale(d.time);
	  		})
	  		.attr("y",function(d){
	  			return yScale(d.value);
	  		})
	  		.attr("width",barWidth)
	  		.attr("height", function(d){
	  			return height - padding.top - padding.bottom - yScale(d.value);
	  		})
	  		.attr("fill","steelblue")		//填充颜色不要写在CSS里
	  	/*	.on("mouseover",function(d,i){
	  			d3.select(this)
	  				.attr("fill","grey");
	  		})
	  		.on("mouseout",function(d,i){
	  			d3.select(this)
	  				.transition()
	  		        .duration(500)
	  				.attr("fill","steelblue");
	  		})*/
	  		.on("click",function(d,i){
	  			try{
	  				window.clearInterval(timeControl);
	  			}
	  			catch(error){

	  			}
	  			
	  			d3.select('.moveBar').attr("x",xScale(d.time));

	  			$("#playSpan").attr("class","glyphicon glyphicon-play");
	  		})

	  		/*var moveBar=svg.append("rect")
	  		        .attr('class','moveBar')
	  		        .attr("transform","translate(" + padding.left + "," + padding.top + ")")
	  		        .attr("width", function() {
	  		            return barWidth;
	  		            //self.intTimeScale(self.model.get("slidingwindowsize"));
	  		        })
	  		        .attr("x", xScale(minX))
	  		        .attr("y", yScale(maxY))
	  		        .attr("height", function(d) {
	  		            return height- padding.top - padding.bottom-yScale(maxY);
	  		        })
	  		        .attr("opacity",0.6)
	  				.attr("fill","white")
	  				.attr("stroke","black")		//填充颜色不要写在CSS里
	  				.attr("stroke-width",2)*/

	  		speed=200
	  		var interval=minX;
	  		//console.log(data.length*timeInterval)
	  		var startPlay=function(xLoc){
	  			//interval+=timeInterval
	  			//interval=minX+(interval-minX)%(data.length*timeInterval)
	  			//console.log(interval)

	  			interval=Date.parse(xScale.invert(d3.select('.moveBar').attr('x')))
	  			var start=interval

	  			interval+=timeInterval
	  			interval=minX+(interval-minX)%(data.length*timeInterval)
	  		
	  			var end=interval
	  			console.log(start)
	  			console.log(end)
	  			animate(start,end)

	  			d3.select('.moveBar').attr("x",xScale(interval))
	  		}

	  		d3.select('#playButton').on('click',function(d){
	  			var state=$("#playSpan").attr("class")
	  			if(state=="glyphicon glyphicon-play")
	  			{
	  				//var xLoc=Date.parse(xScale.invert(d3.select('.moveBar').attr('x')))

	  				timeControl = self.setInterval(startPlay,200);
	  				$("#playSpan").attr("class","glyphicon glyphicon-pause");
	  			}
	  			else
	  			{
	  				timeControl = window.clearInterval(timeControl);
	  				$("#playSpan").attr("class","glyphicon glyphicon-play");
	  			}		
	  		});	

	  		d3.select('#forwardButton').on('click',function(d){
	  			speed+=200
	  		});	
	  		d3.select('backwardButton').on('click',function(d){
	  			speed-=200
	  			speed=Math.max(200,speed)
	  		});

	  		function animate(timeStart,timeEnd){
	  			cities=[]
	  			var merge={}
	  			quakePoints=[]
	  			for(var i=0;i<gData.length;i++){

	  			//  gData[i].timestamp=Date.parse(new Date(gData[i].date+" "+gData[i].Time));
	  			  if(gData[i].timestamp>=timeStart&&gData[i].timestamp<=timeEnd){				     
	  			    gData[i].flag=String(gData[i].X)+String(gData[i].Y);   

	  			    quakePoints.push(gData[i].latLng);
	  			    
	  			    cities.push(gData[i]);
	  			    if(!merge[gData[i].latLng]){
	  			      merge[gData[i].latLng]=[]
	  			    } 
	  			    merge[gData[i].latLng].push(gData[i])
	  			  }
	  			//  break
	  			}
	  			var calData=[]

	  			for(var key in merge){
	  			    var loc=key.split(',')
	  			    loc[0]=+loc[0];
	  			    loc[1]=+loc[1];
	  			    calData.push({'latLng':loc,'data':merge[key]});
	  			}
	  			cities=calData
	  			//console.log(cities)
	  			//console.log(quakePoints)


	  			if($('input:radio:checked').val()=="heat"){
	  				map.updateHeat(quakePoints)
	  			}
	  			else{
	  				map.update(cities)
	  			}
	  			
	  		}

	  		function onBrush() {
	  			var ext=brush.extent();
	  			d3.selectAll(".d3-tip-top").remove()
	  				var tipLabelTop = d3.tip()
	  				  .attr('class', 'd3-tip-top')
	  				  .offset([-8, 0])
	  				  .html(function(d) {
	  				    return d;
	  				})
	  				svg.call(tipLabelTop)
	  				d3.selectAll("#"+"timeline"+" .extent")
	  				  .on('mouseover', function(d){
	  				  	d3.selectAll(".d3-tip-top").style("opacity","1")
	  				  	tipLabelTop.show(format(ext[0])+"-"+format(ext[1]))
	  				  })
	  				  .on('mouseout', function(d){
	  				  	d3.selectAll(".d3-tip-top").style("opacity","0.6")
	  				  })

	  				  
	  		}
	  		function endBrush(){
	  			var ext=brush.extent();
	  			brushStart=Date.parse(ext[0]);
	  			brushEnd=Date.parse(ext[1]);
	  			animate(Date.parse(ext[0]),Date.parse(ext[1]));
	  		}
	  		//animate(1473128537000,1474945937000)

	  		brush = d3.svg.brush()
	  				  .x(xScale)
	  				  .on("brush", onBrush)
	  				  .on("brushend", endBrush)
	  				 


	  		var rect = svg.append("g")
	  		      .attr("class", "x brush")
	  		      .attr("transform","translate(" + padding.left + "," + padding.top + ")")
	  		      .call(brush)

	  		var lineData = [{ "x": 0,   "y": 0}, { "x": 2,  "y": 0},{ "x": 2,  "y": height - padding.bottom-yScale(maxY)}, { "x": 0,  "y": height - padding.bottom-yScale(maxY)},{ "x": 0,  "y": 0},{ "x": 0,   "y": 0}, { "x": 2,  "y": 0},{ "x": 2,  "y": height - padding.bottom-yScale(maxY)}, { "x": 0,  "y": height - padding.bottom-yScale(maxY)},{ "x": 0,  "y": 0}];
	  		var lineFunction = d3.svg.line()
	  		                     .x(function(d,i) { return i<4? -d.x : d.x; })
	  		                     .y(function(d) { return d.y; })
	  		                     .interpolate("linear");

	  		rect.selectAll(".resize")
	  			.append("path")
	  			.attr("class","hander")
	  		    .attr("transform", "translate("+-2.5+"," + 0 + ")")
	  		    .attr("d", function(d,i){
	  		    	return lineFunction(lineData)
	  		    })

	  		rect.selectAll("rect")
	  		      .attr("y", yScale(maxY))
	  		      .attr("height", height- padding.bottom-yScale(maxY))
	  		svg.select(".x .brush")
	  		       .call(brush)	
}
	
	  	
	
