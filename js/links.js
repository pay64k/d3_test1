//global variable for storing information about links [linkID, node1, node2]:
var linksData = [];

function setActivation(node, activate){
	if (node.groupable) {
		if (!node.activated && activate) {
			var move = node.parent.inner_children.splice(node.parent.inner_children.indexOf(node),1)[0];
			if (move.parent.children == undefined) { //d3 removes the property "children" if parent has no children objects, therefore it has to be defined before moving the element
				move.parent.children = [];
			};
			move.parent.children.push(move);
			move.activated = true;
		}else if(node.activated && !activate){
			var move = node.parent.children.splice(node.parent.children.indexOf(node),1)[0];
			if (move != undefined) {			//in case when node has been deleted - this is undefined only if the node has been deleted, so it becomes undefined when trying to splice it in row above
				move.parent.inner_children.push(move);
				move.activated = false;	
			};
		};
	};
}

function prepareLinkage(startNodeName, endNodeName){

	//debugLog(">>>Create Link: " + startNodeName + " to " + endNodeName + "; Link name: " + linkID);

	var node1List = findElementNEW(treeData[0], "name", startNodeName);
	if (node1List.length == 0) {
		return [false, undefined, undefined, startNodeName];
	}else{
		var node2List = findElementNEW(treeData[0], "name", endNodeName);
		if (node2List.length == 0) {
			return [false, undefined, undefined, endNodeName];
		}else{
			var node1 = node1List[0];
			var node2 = node2List[0];
			unhideParents(node1);		
			unhideParents(node2);
			setActivation(node1, true);
			setActivation(node2, true);
			return [true, node1, node2];
		};
	};
}


function drawLink(node1, node2, linkID, linkColorIndex, visible){

	var startX, startY, endX, endY;
	//in case of nodes that were invisivble(that has groupable set to false), since they are not yet visible:
	if (node1.groupable) {
		startX = 0;
		startY = 0;
	}else{
		startX = node1.y;
		startY = node1.x;
	};

	if (node2.groupable) {
		endX = 0;
		endY = 0;
	}else{
		endX = node2.y;
		endY = node2.x;
	};	
	// if (!node1.activated) {
	// 	startX = 0;
	// 	startY = 0;
	// }else{
	// 	startX = node1.y;
	// 	startY = node1.x;
	// };

	// if (!node2.activated) {
	// 	endX = 0;
	// 	endY = 0;
	// }else{
	// 	endX = node2.y;
	// 	endY = node2.x;
	// };

	var offset = 170;

	//var middleY =  (startY + endY) / 2; 

	var lineDataRound = [	{ "x": startX, "y": startY },
							{ "x": endX + offset, "y": startY },
							{ "x": endX + offset, "y": endY },
	                  		{ "x": endX, "y": endY } ];
	 
	var lineFunction = d3.svg.line()
	                      .x(function(d) { return d.x; })
	                      .y(function(d) { return d.y; })
	                      .interpolate("bundle");

	var _svg = d3.select("svg").select("g");

	var linkGroup = _svg.append("g")
						.attr("id","G" + linkID);
	var lineGraph =	linkGroup.append("path")
								.attr("class", "flowline")
			                    .attr("id", linkID)
			                    .attr("stroke", colors(linkColorIndex))
			                    .attr("fill", "none")
			                    .attr("d", lineFunction(lineDataRound))
			                    .on("mouseover", function(){
			                    	var label = d3.select("#G"+linkID).select("text").style("visibility","visible");
			                    })
								.on("mouseout", function(){
									var label = d3.select("#G"+linkID).select("text").style("visibility","hidden");
								});

	// if (visible) {
	// 	linkGroup.attr("opacity", 0.5);
	// }else{
	// 	linkGroup.attr("opacity", 0);
	// };
	linkGroup.attr("opacity", 0);

	var text = d3.select("#G"+linkID)
						.append("text")
						.attr("x", (startX + offset) )
						.attr("y", ((startY + endY) / 2))
						.attr("font-size", "10px")
						.text(linkID)
						.style("visibility","hidden");
						
	debugLog("\t>>>Link created!");

	node1.linkedTo.push([node2, linkID]);
	node2.linkedTo.push([node1, linkID]);
	var linkData = [linkID, node1, node2];
	linksData.push(linkData);
}

function updateLinkNew(linkData){

	var node1 = linkData[1];
	var node2 = linkData[2];

	if (node1.parent.hidden) {
		var startX = node1.parent.y;
		var startY = node1.parent.x;
	}else{
		var startX = node1.y;
		var startY = node1.x;
	};
	if (node2.parent.hidden) {
		var endX = node2.parent.y;
		var endY = node2.parent.x;
	}else{	
		var endX = node2.y;
		var endY = node2.x;
	};
	//if hidden point to parent? then update after expanding/hiding group

	var offset = 170;
  	//var offset = Math.floor(Math.random() * 170) + 10;


	var lineDataRound = [	{ "x": startX, "y": startY },
							{ "x": endX + offset, "y": startY },
							{ "x": endX + offset, "y": endY },
		             		{ "x": endX, "y": endY } ];

	var lineFunction = d3.svg.line()
							.x(function(d) { return d.x; })
							.y(function(d) { return d.y; })
							.interpolate("bundle");

	var linkName = linkData[0];

	var group = d3.select("#G"+linkName).select("text")
									//.transition()
									.attr("x", (startX + offset) )
									.attr("y", ((startY + endY) / 2));

	var link = d3.select("#G"+linkName);
	link.select("path")//.transition()
		.attr("d", lineFunction(lineDataRound));
	link.attr("opacity", 0.5);


}

function deleteLink(linkID){
	debugLog(">>>Remove Link: " + linkID);
	var pathToDelete = d3.select("#G"+linkID);

	if (pathToDelete[0][0] == null) {
		debugLog("\t>>> Error: Link doesnt exist!; Name: " + linkID);
	}else{

		pathToDelete.remove();

		for (var i = 0; i < linksData.length; i++) {
			if (linksData[i][0] == linkID) {
				var linkIndex = i;
				break;
			};
		};

		var deleted=linksData.splice(linkIndex,1)[0];
		debugLog("\t>>>Link removed!");
		var node1 = deleted[1];
		var node2 = deleted[2];
		//remove linked elements from linkedTo property of both nodes:
		var temp = node1.linkedTo.splice(node1.linkedTo.indexOf(node2),1);
	  	var temp = node2.linkedTo.splice(node2.linkedTo.indexOf(node1),1);

		//hide nodes if they are activated and are not linked to any other node:
	  	if (node1.linkedTo.length == 0) {
	   	 	setActivation(node1,false);
	  	};
	  	if (node2.linkedTo.length == 0) {
	    	 setActivation(node2,false);
	  	};
	}
}

function newLink(startNodeName, endNodeName, linkID, linkColorIndex, visible){
	//check if there is allready link with that linkID present:
	var linkUnique = true;
	for (var i = 0; i < linksData.length; i++) {
		if (linksData[i][0] == linkID) {
			linkUnique = false;
			break;
		};
	};
	//if there is not then prepare for linking, that is search for both nodes, activate them etc
	if (linkUnique) {
		var success = prepareLinkage(startNodeName, endNodeName);
		if (success[0]) {
			var node1 = success[1];
			var node2 = success[2];
			drawLink(node1, node2, linkID, linkColorIndex, visible);
		}else{
			debugLog(">>>Couldn't find element: '" + success[3] + "'; Can't create link!");
		};
	}else{
		debugLog(">>>Link of '" + linkID + "' ID allready exist! Can't create link!" );
	};


	
}


function updateAllLinks(){
	for (var i = 0; i < linksData.length; i++) {
		updateLinkNew(linksData[i]);
	};
}

function unhideParents(node){
	if (node.parent!=null) {
		show(node);
		return unhideParents(node.parent);
	}else{
		return 0;
	};
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

function changeFlow(linkName, flow){
    var linkOpacity = d3.select("#G"+linkName);
	var link = linkOpacity.select("path");

	switch(flow) {
    case 0:
        link.style("-webkit-animation", "noFlow 1s linear infinite");
        link.style("opacity", 0.3);
        break;
    case 1:
        link.style("-webkit-animation", "flow 1s linear infinite");
        link.style("opacity", 0.5);
        break;
    case 2:
        link.style("-webkit-animation", "oppositeFlow 1s linear infinite");
        link.style("opacity", 0.5);
        break;
    case "0":
        link.style("-webkit-animation", "noFlow 1s linear infinite");
        link.style("opacity", 0.3);
        break;
    case "1":
        link.style("-webkit-animation", "flow 1s linear infinite");
        link.style("opacity", 0.5);
        break;
    case "2":
        link.style("-webkit-animation", "oppositeFlow 1s linear infinite");
        link.style("opacity", 0.5);
        break;
    default:
        debugLog("\t>>>Worng flow!");
	}
}