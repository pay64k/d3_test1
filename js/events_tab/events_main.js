var heightCounter = 0 ;
var eventDistance = 100;
var scrollingSpeed = 50;
var offsetX_events = 75;
var offsetY_events = 30;
var eventEntryCounter = 11; //change to 1 later
var canvasHeight = 700;
	
var events_data = 	[	{eventEntry: 1, eventVisible: true, _event: 	{eventType:"msgType1", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" } }, 
						{eventEntry: 2, eventVisible: false, _event: 	{eventType:"msgType2", eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" } }, 
						{eventEntry: 3, eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event3", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" } }, 
						{eventEntry: 4, eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event4", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" } }, 
						{eventEntry: 5, eventVisible: true, _event: 	{eventType:"shortData", eventName: "event5", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" } }, 
						{eventEntry: 6, eventVisible: true, _event: 	{eventType:"msgType3", eventName: "event6", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" } },
						{eventEntry: 7, eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event7", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" } }, 
						{eventEntry: 8, eventVisible: true, _event: 	{eventType:"shortData", eventName: "event8", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" } }, 
						{eventEntry: 9, eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event9", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" } }, 
						{eventEntry: 10, eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event10", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" } }, 
					
					];

var arrowHeadPathD = "m 210,8 16,-8 -16,-8 z";
var arrowHeadStyles = "fill:#000000;stroke:none;stroke-width:1px;";
var arrowBodyPathD = "m 30,0 180,0";
var arrowBodyStyles = "fill:none;stroke:#000000;stroke-width:3px;";

var envelopePart1D = "m 30,-40 0,30 49,0 0,-30 z";
var envelopePart2D = "M 30,-40 54,-20 79,-40";
var envelopeStyles = "fill:none;stroke:#000000;stroke-width:3px;";

function events_init(){


	var svg = d3.select("#canvas_events")
	.style("width", "500px")
	.style("height", canvasHeight + "px")
	.style("float", "left")
	.style("margin", "5px")
		.append("svg")
	    	.style("display", "block") 
	    	.style("height", "100%")
	    	.style("width", "100%")
	    	.on("wheel.zoom", scrollFun)
	    		.append("g")
	    			.attr("transform", "translate(" + offsetX_events + "," + offsetY_events + ")")
	    			.attr("id", "events_group");
}

function addEvent(event){
	var newEvent = { eventEntry: eventEntryCounter, eventVisible: true, _event: event };
	eventEntryCounter++;
	events_data.push(newEvent);
}

function clearAllEvents(){
	eventEntryCounter=1;
	events_data = [];
	update_events();
}

function filterEvents(filter){
	
	update_events();
}

function scrollFun(){
	dx = d3.event.wheelDeltaX;
    dy = d3.event.wheelDeltaY;

   // console.log(dx + " | " + dy);

    var group = d3.select("#events_group");
    var currentPostitionY = d3.transform(group.attr("transform")).translate[1];

    if (dy < 0) {

    	if (false) {
			group
			.transition().duration(20)
			.attr("transform", "translate(" + offsetX_events + "," + (currentPostitionY) + ")");
    	}else{
    		group
			.transition().duration(20)
			.attr("transform", "translate(" + offsetX_events + "," + (currentPostitionY - scrollingSpeed) + ")");
    	};
    }else{
    	if (false) {
			group
			.transition().duration(20)
	    	.attr("transform", "translate(" + offsetX_events + "," + (currentPostitionY) + ")");
    	}else{
	    	group
			.transition().duration(20)
	    	.attr("transform", "translate(" + offsetX_events + "," + (currentPostitionY + scrollingSpeed) + ")");
   	
    	};
	};
    //console.log(currentPostitionY);
}

function viewTop(){
	var group = d3.select("#events_group")
		.transition().duration(400)
		.attr("transform", "translate(" + offsetX_events + "," + offsetY_events + ")");
}

function viewBottom(){
	var maxBottomPosition = 0;	//furthest position of a visible event
	for (var i = events_data.length - 1; i >= 0; i--) {
			if (events_data[i].eventVisible && events_data[i].y > maxBottomPosition) {
				maxBottomPosition =  events_data[i].y;
			}; 
		};	
	var group = d3.select("#events_group")
		.transition().duration(400)
		.attr("transform", "translate(" + offsetX_events + "," + ( canvasHeight - offsetY_events - maxBottomPosition  ) + ")");
}

function update_events(){

heightCounter=0;

	for (var i = 0; i < events_data.length; i++) {
		if (events_data[i].eventVisible) {
			events_data[i].x = 0;
			events_data[i].y = eventDistance * heightCounter;
			heightCounter++;
		}else{
			events_data[i].x = 0;
			//events_data[i].y = 0;
		};
		
	};

	var events_group = d3.select("#events_group").selectAll("g").data( events_data.filter(function(d){ return d.eventVisible ? d.eventEntry : null }), function(d) {return d.eventEntry} );
	



	var events_groupEnter = events_group.enter().append("g")			
			.attr("id", function(d) { return d._event.eventName; } )
			.attr("class", "node")
			.attr("transform", function(d, i) { return "translate(" + (-500) + "," + d.y + ") scale(0)"; });
			
	events_groupEnter.append("text")
			.text(function(d) { return "# " + d.eventEntry; })
			.attr("text-anchor", "end")
			.attr("x",-25)
			.attr("y",5);

	events_groupEnter.append("circle")
						.attr("r", 10);

	events_groupEnter.append("text")
			.text(function(d) { return d._event.node1; })
			.attr("text-anchor", "middle")
			.attr("y",25);

	events_groupEnter.append("path")
						.attr("d", arrowBodyPathD )
						.attr("style", arrowBodyStyles);

	events_groupEnter.append("path")
						.attr("d", arrowHeadPathD )
						.attr("style", arrowHeadStyles);	

	events_groupEnter.append("circle")
						.attr("r", 10)
						.attr("cx", 256);

	events_groupEnter.append("text")
			.text(function(d) { return d._event.node2; })
			.attr("text-anchor", "middle")
			.attr("y",25)
			.attr("x",256);

	var envelopeGroup = events_groupEnter.append("g")
								.attr("transform", "translate(69.5,0)");

	envelopeGroup.append("path")
			.attr("d", envelopePart1D )
			.attr("style", envelopeStyles)
			.attr("transform", envelopeVisibility);

	envelopeGroup.append("path")
			.attr("d", envelopePart2D )
			.attr("style", envelopeStyles)
			.attr("transform", envelopeVisibility);

				

	var events_groupUpdate = events_group.transition()
		.duration(500)
		.ease("bounce")
		.attr("transform", function(d,i) { return "translate(" + d.x + "," + d.y + ") scale(1)"; });

	var events_groupExit = events_group.exit().transition()
		.duration(500)
		.attr("transform", function(d) { return "translate(" + 500 + "," + d.y + ") scale(1)"; })
		.remove();
}

function envelopeVisibility(d){
	if (d._event.eventType == "shortData") {
		return "scale(1)"
	}else{
		return "scale(0)"
	};
}