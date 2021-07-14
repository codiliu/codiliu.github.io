function draw_starplot(data){
  $('.chart').remove();
  var margin = {
    top: 30,
    right: 0,
    bottom: 20,
    left: 40
  };
  var width = $('#starPlot').width() - margin.left - margin.right;
  var height = $('#starPlot').height() - margin.top - margin.bottom;
  var labelMargin = 8;

var scale = d3.scale.linear()
  .domain([5000, 5700])
  .range([0, 100])

var csvfile = d3.csv('data/DayOfWeekSet.csv');
console.log(csvfile);

  csvfile.row(function(d) {
//       console.log(d)
      d.Sunday = +d.Sunday;
      d.Monday = +d.Monday;
      d.Tuesday = +d.Tuesday;
      d.Wednesday = +d.Wednesday;
      d.Thursday = +d.Thursday;
      d.Friday = +d.Friday;
      d.Saturday = +d.Saturday;
      return d;
  })
  .get(function(error, rows) {
    var star = d3.starPlot()
      .width(height)
      .properties([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ])
      .scales(scale)
      .labels([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ])
      .title(function(d){return 'DayOfWeek';})
      .margin(margin)
      .labelMargin(labelMargin)

    rows.forEach(function(d, i) {
      star.includeLabels(true);

      var wrapper = d3.select('#starPlot')

      var svg = wrapper.append('svg')
        .attr('class', 'chart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', width + margin.top + margin.bottom)

      var starG = svg.append('g')
        .datum(d)
        .call(star)
        .call(star.interaction)

      var interactionLabel = wrapper.append('div')
        .attr('class', 'interaction label')

      var circle = svg.append('circle')
        .attr('class', 'interaction circle')
        .attr('r', 5)

      var interaction = wrapper.selectAll('.interaction')
        .style('display', 'none');

      svg.selectAll('.star-interaction')
        .on('mouseover', function(d) {
          svg.selectAll('.star-label')
            .style('display', 'none')

          interaction
            .style('display', 'block')

          circle
            .attr('cx', d.x)
            .attr('cy', d.y)

          $interactionLabel = $(interactionLabel.node());
          interactionLabel
            .text(d.key + ': ' + d.datum[d.key])
            .style('left', d.xExtent - ($interactionLabel.width() / 2)+'px')
            .style('top', d.yExtent - ($interactionLabel.height() / 2)+'px')
        })
        .on('mouseout', function(d) {
          interaction
            .style('display', 'none')

          svg.selectAll('.star-label')
            .style('display', 'block')
        })
    });
  });
}
