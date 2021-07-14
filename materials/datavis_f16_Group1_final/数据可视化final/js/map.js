var drawMap=function(){
  var self=this;
  self.heat;
  self.map = L.map("map-canvas",{center:[37.75, -122.469357],zoom:10});
  var accessToken = 'pk.eyJ1IjoieWV0YW5nemhpIiwiYSI6ImNpajFrdmJ1aDAwYnF0b2x6cDA2bndybjgifQ.g9phAioL8kT5ik4jGg6kNQ';
  var style = "emerald"; // emerald,light,dark
  self.tileLayer = L.tileLayer('https://api.mapbox.com/v4/mapbox.' +  style+ '/{z}/{x}/{y}.png?access_token=' + accessToken).addTo(self.map);
  self.L=L;


  self.heat = self.L.heatLayer([],{
             radius: 10,
             blur: 15, 
             maxZoom: 17,
         }).addTo(self.map);
  console.log(L)
}
drawMap.prototype.updateHeat=function(quakePoints){
  var self=this
  d3.selectAll(".trajpoint").remove()
  //self.map.removeLayer(self.heat);
  self.heat.setLatLngs(quakePoints)
/*  self.heat = self.L.heatLayer(quakePoints,{
             radius: 10,
             blur: 15, 
             maxZoom: 17,
         }).addTo(self.map);
*/

  /*self.heat = self.L.heatLayer(quakePoints,{
             radius: 10,
             blur: 15, 
             maxZoom: 17,
         }).addTo(self.map);*/
}
drawMap.prototype.update=function(cities){
  var self=this;
  self.heat.setLatLngs([])
  
  var citiesOverlay = self.L.d3SvgOverlay(function(sel,proj){
   
    d3.selectAll(".trajpoint").remove()
    scale=proj.scale
    var citiesUpd = sel.selectAll('circle').data(cities);

    //console.log(cities)
    citiesUpd.enter()
      .append('circle')
      .attr("class","trajpoint")
      .attr('r',function(d){
        return Math.log2(d.data.length+4)/proj.scale
      })
      .attr('cx',function(d){return proj.latLngToLayerPoint(d.latLng).x;})
      .attr('cy',function(d){return proj.latLngToLayerPoint(d.latLng).y;})
      .style('stroke','black')
      .attr('stroke-width',function(d){
        if(d.data.length<3){
          return 15/proj.scale;
        }
        else{
          return 1/proj.scale;
        }
      })
      .attr('stroke-opacity',0)
      .style("opacity", function(d){
        return 0.6
        //Math.max(d.data.length*3,0.6)/10;
      })
      .attr('fill',"red")
      .on("click",function(d){
          console.log(d.data);
      })
      .on("mouseover",function(d) {
        d3.select(this)
          .style("cursor", "pointer")
          .style("opacity",0.6)
          .style("fill","blue")

         /* citiesUpd.selectAll(".d3-tip-event").remove()
          
          var tipLabelTop = d3.tip()
            .attr('class', 'd3-tip-event')
            .offset([-8, 0])
            .html(function(d) {
              return d;
          })
*/
          /*citiesUpd.call(tipLabelTop)

          citiesUpd.selectAll("#"+"timeline"+" .extent")
            .on('mouseover', function(d){
              d3.selectAll(".d3-tip-event").style("opacity","1")
              tipLabelTop.show(format(ext[0])+"-"+format(ext[1]))
            })
            .on('mouseout', function(d){
              d3.selectAll(".d3-tip-top").style("opacity","0.6")
            })*/

      })
      .on("mouseout",function(d) {
          d3.select(this)
            .style("cursor", "default")
            .style("opacity",1)
            .style("fill","red")
      })
      .append("title")
      .text(function(d){
        var name="Total event number: "+String(d.data.length)+"\n";
        var allCat={}

        for(var i=0;i<d.data.length;i++){
          if(d.data[i].Category in allCat){
            allCat[d.data[i].Category]+=1;
          }
          else{
            allCat[d.data[i].Category]=1;
          }
        }

        var i=1;
        for(var index in allCat){
          name=name+String(i)+"."+index+" "+allCat[index]+"\n"
          i+=1
        }
        
        return name;
      }); 

  });
  citiesOverlay.addTo(self.map);
  
}

