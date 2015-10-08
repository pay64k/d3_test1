function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 200; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click)
      .on("dblclick", dblclick);

  nodeEnter.append("circle")
	  .attr("r", 1e-6)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
	  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name + " \t" +d.type; })
	  .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 10)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

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
}

//double click
function dblclick(d) {

}

function findNodeByName(nodeName){
var nodes = d3.selectAll(".node");
return nodes.filter( function(d,i){return d.name == nodeName ;} ).data()[0];	//return as object due to data()[0], if the node was not found retunrs undefined
}

function addLink(startNodeName, endNodeName, linkID){

debugLog(">>>Create Link: " + startNodeName + " to " + endNodeName + "; Link name: " + linkID);

// var nodes = d3.selectAll(".node");//.data();
// var node1 = nodes.filter( function(d,i){return d.name == startNodeName ;} )
// var node2 = nodes.filter( function(d,i){return d.name == endNodeName ;} )

var node1 = findNodeByName(startNodeName);
var node2 = findNodeByName(endNodeName);

if (node1 == undefined || node2 == undefined) {
	debugLog("\t>>>One of the nodes doesn't exist! Can't create link!");
}else{

	var startX =   node1.y;
	var startY =   node1.x;
	var endX =     node2.y;
	var endY =     node2.x;

	var offset = 150;

	//console.log("start x: " + startX + ", start y: " + startY +" | " + "end x: " + endX + ", end y: " + endY );

	var middleY =  (startY + endY) / 2; 
	
	var lineData = [  { "x": startX, "y": startY },
	                  { "x": startX + offset, "y": middleY }, 
	                  { "x": endX, "y": endY } ];

	var lineDataRound = [	{ "x": startX, "y": startY },
							{ "x": endX + offset, "y": startY },
							{ "x": endX + offset, "y": endY },
	                 		//{ "x": startX + offset, "y": middleY }, 
	                  		{ "x": endX, "y": endY } ];
	 
	 var lineFunction = d3.svg.line()
	                      .x(function(d) { return d.x; })
	                      .y(function(d) { return d.y; })
	                      .interpolate("bundle");

	var _svg = d3.select("svg").select("g");

	var lineGraph = _svg.append("path")
	                    .attr("id", linkID)
	                    .attr("d", lineFunction(lineDataRound))
	                    .attr("stroke", "blue")
	                    .attr("stroke-width", 1.5)
	                    .attr("fill", "none");

	var totalLength = lineGraph.node().getTotalLength();

	lineGraph.attr("stroke-dasharray", totalLength + " " + totalLength)
	        .attr("stroke-dashoffset", totalLength)
	        .transition()
	        .duration(1000)
	        .ease("linear")
	        .attr("stroke-dashoffset", 0);

	debugLog("\t>>>Link created!");
	}
}

function removeLink(linkID){
debugLog(">>>Remove Link: " + linkID);
//to delete the path:
var pathToDelete = d3.select("#"+linkID);

if (pathToDelete[0][0] == null) {
	debugLog("\t>>> Error: Link doesnt exist!; Name: " + linkID);
}else{

	var totalLength = pathToDelete.node().getTotalLength();

	pathToDelete.transition()
	        .duration(1000)
	        .ease("linear")
	        .attr("stroke-dashoffset", -totalLength)
	        .remove();
	debugLog("\t>>>Link removed!");
	}
}