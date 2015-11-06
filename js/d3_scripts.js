//move to separate function, run once during initzialization, store colors in global variable
var colorScale = [];
var colorMax = 20;

for (var i = 1; i <= colorMax; i++) {
	colorScale.push(i);
};

var colors =  d3.scale.category20().domain(colorScale); //	https://github.com/mbostock/d3/wiki/Ordinal-Scales


function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);
//debugger;
  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 160; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("id", function(d) { return d.name; })
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click)
      .on("dblclick", dblclick);
      // .on("mouseover", showTypeText)
      // .on("mouseout", hideTypeText);

  nodeEnter.append("circle")
	  .attr("r", 1e-6)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; })
	  .on("mouseover", showTypeText)
      .on("mouseout", hideTypeText);


		var circleGroup = nodeEnter.append("g")
	  		.attr("class","circleGroup")
	  		.attr("transform", "scale(0)")
	  		.on("mouseover", showTypeText)
      		.on("mouseout", hideTypeText);;

	  		circleGroup.append("circle")
	  			.attr("r", 10)
	  			.attr("transform","translate(" + 5 + "," + 5 + ")" );
	  		circleGroup.append("circle")
	  			.attr("r", 10)
	  			.attr("transform","translate(" + 10 + "," + 10 + ")" );


  nodeEnter.append("text")
  	  .attr("class", "nameText")
  	  .style("font-family", "Verdana")
	  //.attr("x", function(d) { return d.children || d._children ? -13 : 13; })
	  //.attr("x", -15)
	  // .attr("dy", ".35em")
	  .attr("y", -15)
	  //.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .attr("text-anchor", "middle")
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1e-6);

nodeEnter.append("text")
	.attr("class", "typeText")
	.attr("text-anchor", "start")
	.style("font-family", "Verdana")
	.attr("x", 20)
	.attr("y", 3)
	.text(function(d) { return d.type; })
	.style("fill-opacity", 1e-6)
	.style("fill", "red");

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
  	  .ease("bounce")				//-----------------------------------------------node animation here
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 10)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

	  			nodeUpdate.select(".circleGroup")

	  				.attr("transform",  function(d){ 	if (d.inner_children != undefined) {
	  												if (d.inner_children.length > 0) {
														return "scale(1)";
	  												}else{
	  													return "scale(0)";
	  												};
	  											}else{
	  												return "scale(0)";
	  											} ; }  )

	  				.style("fill", "#fff");

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select(".circleGroup")
	  .attr("transform", "scale(0)");
	  //.attr("transform","translate(" + 0 + "," + 0 + ")" );

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  });

  // Transition links to their new position.
  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });
  //updateLinks();
}

function showTypeText(node){
	d3.select("#" + node.name).select(".typeText").style("fill-opacity", 1);
}

function hideTypeText(node){
	d3.select("#" + node.name).select(".typeText").style("fill-opacity", 1e-6);
}

// Toggle children on click.
function click(d) {
  if (! d.hidden) {
      d.hidden = true;
        d._children = d.children;
        d.children = null;
  } else {
      d.hidden = false;
	    d.children = d._children;
	    d._children = null;
  }
  update(d);
  updateAllLinks();
}

//double click
function dblclick(d) {
console.log("double click!! omgomgomg!!");
}

