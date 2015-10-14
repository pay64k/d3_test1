function update(source) {

  // console.log("UPDATE123");

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);
//debugger;
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
  //updateLinks();
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
  updateLinks();
}

//double click
function dblclick(d) {

}

function findNodeByName(nodeName){
// var nodes = d3.selectAll(".node");
// return nodes.filter( function(d,i){return d.name == nodeName ;} ).data()[0];	//return as object due to data()[0], if the node was not found returns undefined
var previuoslyHidden = toggleAll();					//look also in hiddden elements
var node = findElement(treeData[0],nodeName)[1];
toggleSelection(previuoslyHidden);					//set elements to hidden affter looking
return node;
}

function unhideParents(node){
	if (node.parent!=null) {
		show(node);
		return unhideParents(node.parent);
	}else{
		return 0;
	};
		
}

function findHidden(){
  var hiddenElements = [];
  var q = new Queue();
    q.enqueue(root);    //look in the whole tree

    while (true) {
        var node = q.dequeue();

        if (node == undefined){
          return hiddenElements;
        };

        if (node.hidden == true)
        {
            hiddenElements.push(node);
        }
        
        if (node.children != undefined)
        {
            for (var i=0, c=node.children.length; i<c; i++) {
                q.enqueue(node.children[i]);
            }
        }

        if (node._children != undefined) 
        {
            for (var i=0, c=node._children.length; i<c; i++) {
                q.enqueue(node._children[i]);
            }
        }
    }
}

//find all hidden
//if any: copy hidden to unhidden; get the list of previuosly hidden to be able to hide them after adding to them
//add to previuosly hidden
//hide previuosly hidden
function toggleAll(){
var hiddenNodes = findHidden();
  if (hiddenNodes.length != 0) {
    for (var i = 0; i < hiddenNodes.length; i++) {
      toggle(hiddenNodes[i]);
    };
  };
  return hiddenNodes;
}

function toggleSelection(previuoslyHidden){
  if (previuoslyHidden.length != 0) {
    for (var i = 0; i < previuoslyHidden.length; i++) {
      toggle(previuoslyHidden[i]);
    };
  };
}

function toggle(d) {
  if (! d.hidden) {
      d.hidden = true;
        d._children = d.children;
        d.children = null;
  } else {
      d.hidden = false;
      d.children = d._children;
      d._children = null;
  }
  // update(d);
}

function show(d) {
 if (d.hidden) {
      d.hidden = false;
      d.children = d._children;
      d._children = null;
  }
}

function hide(d) {
 if (! d.hidden) {
      d.hidden = true;
      d._children = d.children;
      d.children = null;
  }
}

function addLink(startNodeName, endNodeName, linkID, linkColorIndex, dashAmount){

debugLog(">>>Create Link: " + startNodeName + " to " + endNodeName + "; Link name: " + linkID);

var node1 = findNodeByName(startNodeName);	//see if both nodes exist
var node2 = findNodeByName(endNodeName);

//move to separate function, run once during initzialization, store colors in global variable
var colorScale = [];
var colorMax = 10;

for (var i = 1; i <= colorMax; i++) {
	colorScale.push(i);
};

var colors =  d3.scale.category10().domain(colorScale); //	https://github.com/mbostock/d3/wiki/Ordinal-Scales

//check if nodes exist
if (node1 == 0 || node2 == 0) {	//compare to 0
	debugLog("\t>>>One of the nodes doesn't exist! Can't create link!");
}else{

	unhideParents(node1);		//if yes unhide parents of both nodes
	unhideParents(node2);
	update(root);				//visually unhide nodes
	//then draw a link:
	var startX =   node1.y;
	var startY =   node1.x;
	var endX =     node2.y;
	var endY =     node2.x;

	var offset = 170;

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

	var lineGraph = _svg.append("g")
						.attr("id","G" + linkID)
							.append("path")
								//.attr("transform","scale(0)")
			                    .attr("id", linkID)
			                    .attr("stroke-width", 2)
			                    .attr("stroke", colors(linkColorIndex))
			                    .attr("fill", "none")
			                    .attr("d", lineFunction(lineDataRound))
			                    .on("mouseover", function(){
			                    	var label = d3.select("#G"+linkID).select("text").style("visibility","visible");
			                    })
								.on("mouseout", function(){
									var label = d3.select("#G"+linkID).select("text").style("visibility","hidden");
								});
								//.transition().duration(1).attr("transform","scale(1)");
								//this coused linking to be drawn in the middle of the way if the links creation was too fast (clicking)

//for mouse hovering, it was not easy to point on the thin link line so there is one 'invisible' line sorrounding the visible line:
	var invisibleLine = d3.select("#G"+linkID).append("path")
								.attr("id", linkID)
			                    .attr("stroke-width", 8)
			                    .attr("stroke", "red")
			                    .attr("stroke-opacity", 0)
			                    .attr("fill", "none")
			                    .attr("d", lineFunction(lineDataRound))
			                    .on("mouseover", function(){
			                    	var label = d3.select("#G"+linkID).select("text").style("visibility","visible");
			                    })
								.on("mouseout", function(){
									var label = d3.select("#G"+linkID).select("text").style("visibility","hidden");
								});

	var text = d3.select("#G"+linkID)
						.append("text")
						.attr("x", (startX + offset) )
						.attr("y", ((startY + endY) / 2))
						.attr("font-size", "10px")
						.text(linkID)
						.style("visibility","hidden");
						
	// d3.select("#"+node1.name).attr("stroke","red");
	// console.log(node1.name);
	// var totalLength = lineGraph.node().getTotalLength();

	// lineGraph.attr("stroke-dasharray", totalLength + " " + totalLength)
	//         .attr("stroke-dashoffset", totalLength)
	//         .transition()
	//         .duration(200)
	//         .ease("linear")
	//         .attr("stroke-dasharray", 0); 

//ORIGINAL:
	// lineGraph.attr("stroke-dasharray", totalLength + " " + totalLength)
	//         .attr("stroke-dashoffset", totalLength)
	//         .transition()
	//         .duration(200)
	//         .ease("linear")
	//         .attr("stroke-dashoffset", 0); 

	debugLog("\t>>>Link created!");
	updateLinks();
	return [node1, node2, lineGraph, linkID];
	}
}


function removeLink(linkID){
	debugLog(">>>Remove Link: " + linkID);
	//to delete the path:
	var pathToDelete = d3.select("#G"+linkID);

	if (pathToDelete[0][0] == null) {
		debugLog("\t>>> Error: Link doesnt exist!; Name: " + linkID);
	}else{

		//var totalLength = pathToDelete.node().getTotalLength();

		pathToDelete
		.transition()
			.duration(500)
			.attr("transform","scale(0)")
	        .remove();

	//ORIGINAL animation:
		// pathToDelete.transition()
		//         .duration(750)
		//         .ease("linear")
		//         .attr("stroke-dashoffset", -totalLength)
		//         .remove();

		var linkIndex = linksGLOBAL.indexOf(linkID);
		linksGLOBAL.splice(linkIndex,1);

		updateLinks();
		debugLog("\t>>>Link removed!");
		}
}

function updateLinks(){
	//Each array element in linksGLOBAL looks like [node1, node2, lineGraph, linkID] - [object, object, object, string]
	if (linksGLOBAL.length != 0) {
		for (var i = 0; i < linksGLOBAL.length; i++) {
			updateLink(linksGLOBAL[i]);
		};
	}else{
		//debugLog("No links to update!");
	};
}

function updateLink(linkData){
var node1 = linkData[0];
var node2 = linkData[1];


if (node1.parent.hidden) {
	var startX =   node1.parent.y;
	var startY =   node1.parent.x;
}else{
	var startX =   node1.y;
	var startY =   node1.x;
};
if (node2.parent.hidden) {
	var endX =     node2.parent.y;
	var endY =     node2.parent.x;
}else{	
	var endX =     node2.y;
	var endY =     node2.x;
};
	//if hidden point to parent? then update after expanding/hiding group

	var offset = 170;

	var lineDataRound = [	{ "x": startX, "y": startY },
							{ "x": endX + offset, "y": startY },
							{ "x": endX + offset, "y": endY },
		             		{ "x": endX, "y": endY } ];

	var lineFunction = d3.svg.line()
							.x(function(d) { return d.x; })
							.y(function(d) { return d.y; })
							.interpolate("bundle");

	var linkName = linkData[3];
	//var link = d3.select("svg").select("g").select("path#"+linkName);

var group = d3.select("#G"+linkName).select("text")
									.transition()
									.attr("x", (startX + offset) )
									.attr("y", ((startY + endY) / 2));

	var link = d3.select("#G"+linkName);
	//var totalLength = link.node().getTotalLength();
	link.select("path").transition()
		.attr("d", lineFunction(lineDataRound));

//ORIGINAL:	
	// link.transition()
	// 	.attr("d", lineFunction(lineDataRound));



}