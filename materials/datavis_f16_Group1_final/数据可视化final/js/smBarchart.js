function draw_smBarchart(data,Catogory_Arr){
    // console.log(data)
    var District = [];
    data.forEach(function(dis){
      District.push(dis.key);
    })
    //console.log(District);
    var margin = {top: 20, right: 10, bottom: 20, left: 50},
      width = $('#smBarchart').width() - margin.left - margin.right,
      height = $('#smBarchart').height() - margin.top - margin.bottom;

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>" + d.Catogory + "</strong><br/><span style='color:#fff'>" + d.number + "</span>";
        });

    var svg = d3.select("#smBarchart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .2);

    var x = d3.scale.linear()
        .range([0, width/12]);

    y.domain(Catogory_Arr);
    // x.domain([d3.min(data.values, function(d) { return +d.number; })-50, d3.max(data.values, function(d) { return +d.number; })]);
    x.domain([0,Math.pow(2229,1/3)]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickValues(x.domain());
        
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(function(d){return d.substr(0,7)});

    g.append("g")
        .attr("class", "axis axis_bar_y")
        .call(yAxis);
      // .append("text")
      //   .attr("fill", "#000")
      //   .attr("transform", "rotate(-90)")
      //   .attr("y", 6)
      //   .attr("dy", "0.71em")
      //   .style("text-anchor", "end")
      //   .text("Number");

    var subclass = g.selectAll(".axis.axis_bar_x")
        .data(data)
        .enter()
        .append("g");

    subclass.append("g")
        .attr("class", "axis axis_bar_x")
        .attr("transform", function(d,i){
          return "translate("+ i*width/10 +"," + height + ")";
        })
        .call(xAxis);

    subclass.append("text") 
        .attr("transform", function(d,i){
          return "translate("+ i*width/10 +",-10)";
        })
        .style("font-size","7.5px")
        .text(function(d){
         // console.log(d)
          return d.key;
        });

    subclass.selectAll(".bar")
          .data(function(d){return d.values;})
        .enter().append("rect")
          .attr("class","bar smBarchart")
          .attr("id",function(d){
            return "smBarchart_"+d.Catogory;
          })
          .attr("x", function(d){
            var index = District.indexOf(d.PdDistrict);
            return index*width/10;
          })
          .attr("height", y.rangeBand())
          .attr("y", function(d) { return y(d.Catogory); })
          .attr("width", function(d) { return x(Math.pow(d.number,1/3)); })
          .style("fill",function(d){
            return z(d.PdDistrict);
          })
          .style("stroke",1)
          .style('cursor','pointer')
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .on('click',function(d){
            if(Category_Arr.indexOf(d.Catogory) == -1)
              Category_Arr.push(d.Catogory);
            else
              Category_Arr.splice(Category_Arr.indexOf(d.Catogory),1);
            smBarchart_Filter(Category_Arr);
            bubble_Filter(Category_Arr);
            linechart_Filter(Category_Arr);
            // starPlot_Filter(d);
          });

    g.call(tip);
}

function smBarchart_Filter(Category_Arr){
  console.log(Category_Arr)
  var smBarchart_selection = d3.selectAll('.bar.smBarchart');
  if(Category_Arr.length == 0)
    smBarchart_selection.style('fill-opacity',1);
  else{
        // smBarchart_selection.style('fill-opacity',.3);

      smBarchart_selection.style('fill-opacity',function(d){
        if(Category_Arr.indexOf(d.Catogory) == -1)
          return .3;
        else
          return 1;
      });
  }
}