createBubble();

function createBubble() {

// dimensiones
var width = 800;
// var height = document.getElementById("content").clientHeight;
var height = 850;

// Se crea el SVG
var svg = d3.select("#content")
  .append("svg")
  .attr("align", "center")
  .attr("width", width)
  .attr("height", height)
  .attr("align", "left")
  .append('g');

var simulation = d3.forceSimulation().velocityDecay(0.2)
  .force("charge", d3.forceManyBody().strength(390))
  .force('collision', d3.forceCollide().radius(100))
  .force("center", d3.forceCenter(width/2 , height/2));

d3.csv("data/nodes.csv").then(function(data) {

  var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(data)
    .enter().append("g")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);

  var images = node.append("image")
    .attr('xlink:href', function(d) {
      return "img/congresistas/" + d.ID.replace(/ /g, '').replace("*", '') + ".png";
    }).attr("width", 100)
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

  function mouseover() {
    images.transition()
      .duration(5).attr("width", 0.001);

    d3.select(this).select("image").transition()
      .duration(750)
      .attr("width", 180);

    d3.select(this).append("text")
      .attr("id", "label")
      .text(function(d) {
        return d.ID;
      })
      .style("font-size", "30px")
      .style("font-weight", "bold")
      .style("fill", "black")
      .style("stroke-width", 1)
      .style("stroke", "white");
  }

  function mouseout() {
    d3.select("#label").remove();

    images.transition()
      .duration(5).attr("width", 85);
  }

  node.append("title")
    .text(function(d) {
      return d.ID;
    });

  simulation
    .nodes(data)
    .on("tick", ticked);

  function ticked() {

    node
      .attr("transform", function(d) {
        return "translate(" + d.x / 1.3   + "," + d.y / 1.5+ ")";
      });
  }
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
};


// }
