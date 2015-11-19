var heightCounter = 0 ;
var eventDistance = 130;
var scrollingSpeed = 50;
var offsetX_events = 75;
var offsetY_events = 30;
var eventEntryCounter = 1; //change to 1 later
var canvasHeight = 700;
	
var events_data = [];
var events_data_paged = [];

var arrowHeadPathD = "m 210,8 16,-8 -16,-8 z";
var arrowBodyPathD = "m 30,0 180,0";

var arrowSuccessStyle = "fill:#000000;stroke:black;stroke-width:1px;"
var arrowFailedStyle = "fill:#ff5656;stroke:#ff5656;stroke-width:1px;"

var envelopePart1D = "m 100,-40 0,30 49,0 0,-30 z";
var envelopePart2D = "M 100,-40 124,-20 149,-40";
var envelopeStyles = "fill:none;stroke:#000000;stroke-width:3px;";

function updateEventView(activePage){

	// //filter
	// var fiteredEvents = applyFilterCombination(); 
	// //page
	// var pagedEvents = pageEvents(fiteredEvents);
	//get current page number
	//var activePage = page;
	//update
	update_events_specific(events_data_paged[activePage].events);

}

function events_init(){


	var svg = d3.select("#canvas_events")
	.style("width", "500px")
	.style("height", canvasHeight + "px")
	.style("float", "left")
	.style("margin", "5px")
	.style("overflow", "auto")
		.append("svg")
	    	.style("display", "block") 
	    	.style("height", getSVGHeight())
	    	.style("width", "100%")
	    	//.on("wheel.zoom", scrollFun)
	    		.append("g")
	    			.attr("transform", "translate(" + offsetX_events + "," + offsetY_events + ")")
	    			.attr("id", "events_group");

//loadEventsDataFromStorage();
//addTestEvents();
//addTestEventsMore();

}

function getSVGHeight(){
	return eventsPerPage * eventDistance;
}

function loadEventsDataFromStorage(){
	// debugger;
	var index = $.jStorage.index();
	if (index.length == 0) {
		events_data = [];
	}else{
		events_data = [];
		for (var i = 0; i < index.length; i++) {
			events_data.push( $.jStorage.get( index[i] ) );
		};
		eventEntryCounter = index.length + 1;
	};
}

function addEvent(event, visible){

	var newEvent = { eventEntry: eventEntryCounter, eventVisible: visible, _event: event };
	//addEventToStorage(eventEntryCounter, newEvent);
	events_data.push(newEvent);
	eventEntryCounter++;
}

function clearAllEvents(){

	if (confirm("Are you sure to clear all events?") == true) {
    	eventEntryCounter=1;
		events_data = [];
		$.jStorage.flush();
		update_events();
	};
}

function getUniqueEventTypes(){
	var allEventTypes = [];
	for (var i = 0; i < events_data.length; i++) {
		allEventTypes.push(events_data[i]._event.eventType)
	};
	return allEventTypes.unique();
}

function getUniqueEventSessions(){
	var allEventTestSession = [];
	for (var i = 0; i < events_data.length; i++) {
		allEventTestSession.push(events_data[i]._event.testSession)
	};
	return allEventTestSession.unique();
}

function getUniqueEventNode1(){
	var allEventNode1 = [];
	for (var i = 0; i < events_data.length; i++) {
		allEventNode1.push(events_data[i]._event.node1)
	};
	return allEventNode1.unique();
}

function getUniqueEventNode2(){
	var allEventNode2 = [];
	for (var i = 0; i < events_data.length; i++) {
		allEventNode2.push(events_data[i]._event.node2)
	};
	return allEventNode2.unique();
}

function loadEvents(){
	requestEvents("min", "max");
}

function requestEvents(from, to){
	var request = {command: "REQUEST_EVENTS", from: from, to: to };
 	client.send("/queue/example_QD1", {priority: 9}, JSON.stringify(request));
}

// function requestCurrentEventAmount(){
// 	var request = {command: "REQUEST_EV_CURR_AMOUNT"};
//  	client.send("/queue/example_QD1", {priority: 9}, JSON.stringify(request));
// }

function scrollFun(){
	dx = d3.event.wheelDeltaX;
    dy = d3.event.wheelDeltaY;

    var group = d3.select("#events_group");
    var currentPostitionY = d3.transform(group.attr("transform")).translate[1];
    //console.log(currentPostitionY);
    if (dy < 0) {
		group
		.transition().duration(20)
		.attr("transform", "translate(" + offsetX_events + "," + (currentPostitionY - scrollingSpeed) + ")");
    }else{
    	group
		.transition().duration(20)
    	.attr("transform", "translate(" + offsetX_events + "," + (currentPostitionY + scrollingSpeed) + ")");
	};

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
		.attr("transform", "translate(" + offsetX_events + "," + ( canvasHeight - offsetY_events - maxBottomPosition -20  ) + ")");
}

function focusOnEvent(eventEntry){
	for (var i = 0; i < events_data.length; i++) {
		if (events_data[i].eventEntry == eventEntry && events_data[i].eventVisible) {
			var eventGroup = d3.select("#events_group").select("#eventEntry" + events_data[i].eventEntry );

			var currentEventPostitionY = d3.transform(eventGroup.attr("transform")).translate[1];
			var currentEventPostitionX = d3.transform(eventGroup.attr("transform")).translate[0];

			var eventGroupSVG = d3.select("#events_group");

			eventGroupSVG.transition().duration(400)
					.attr("transform", "translate(" + offsetX_events + "," + ( - currentEventPostitionY + offsetY_events  ) + ")");

			eventGroup.transition().duration(1000)
				.attr("transform", "translate("+ currentEventPostitionX +","+ currentEventPostitionY +")scale(1.5)")
					.each("end",function(){
                		d3.select(this).transition().duration(1000)
							.attr("transform", "translate("+ currentEventPostitionX +","+ currentEventPostitionY +")scale(1)");
              		});
		};
	};
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
			.attr("id", function(d) { return "eventEntry" + d.eventEntry; } )
			.attr("class", "node")
			.attr("transform", function(d, i) { return "translate(" + (-100) + "," + d.y + ") scale(0)"; });
			
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

	events_groupEnter.append("circle")
						.attr("r", 10)
						.attr("cx", 256);

	events_groupEnter.append("text")
			.text(function(d) { return d._event.node2; })
			.attr("text-anchor", "middle")
			.attr("y",25)
			.attr("x",256);


		events_groupEnter.append("path")
				.attr("d", envelopePart1D )
				.attr("style", envelopeStyles)
				.attr("transform", envelopeVisibility);

		events_groupEnter.append("path")
				.attr("d", envelopePart2D )
				.attr("style", envelopeStyles)
				.attr("transform", envelopeVisibility);

		events_groupEnter.append("path")
				.attr("d", arrowBodyPathD )
				.attr("style", arrowColor);

		events_groupEnter.append("path")
							.attr("d", arrowHeadPathD )
							.attr("style", arrowColor);

	events_groupEnter.append("text")
			.text(function(d) { return d._event.eventType; })
			.attr("text-anchor", "middle")
			.attr("y",25)
			.attr("x",128);

				

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


function update_events_specific(e_data){

	heightCounter=0;

	for (var i = 0; i < e_data.length; i++) {
		if (e_data[i].eventVisible) {
			e_data[i].x = 0;
			e_data[i].y = eventDistance * heightCounter;
			heightCounter++;
		}else{
			e_data[i].x = 0;
			//events_data[i].y = 0;
		};
		
	};

	var events_group = d3.select("#events_group").selectAll("g").data( e_data.filter(function(d){ return d.eventVisible ? d.eventEntry : null }), function(d) {return d.eventEntry} );
	

	var events_groupEnter = events_group.enter().append("g")			
			.attr("id", function(d) { return "eventEntry" + d.eventEntry; } )
			.attr("class", "node")
			.attr("transform", function(d, i) { return "translate(" + (-100) + "," + d.y + ") scale(0)"; });
			
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

	events_groupEnter.append("circle")
						.attr("r", 10)
						.attr("cx", 256);

	events_groupEnter.append("text")
			.text(function(d) { return d._event.node2; })
			.attr("text-anchor", "middle")
			.attr("y",25)
			.attr("x",256);


		events_groupEnter.append("path")
				.attr("d", envelopePart1D )
				.attr("style", envelopeStyles)
				.attr("transform", envelopeVisibility);

		events_groupEnter.append("path")
				.attr("d", envelopePart2D )
				.attr("style", envelopeStyles)
				.attr("transform", envelopeVisibility);

		events_groupEnter.append("path")
				.attr("d", arrowBodyPathD )
				.attr("style", arrowColor);

		events_groupEnter.append("path")
							.attr("d", arrowHeadPathD )
							.attr("style", arrowColor);

	events_groupEnter.append("text")
			.text(function(d) { return d._event.eventType; })
			.attr("text-anchor", "middle")
			.attr("y",25)
			.attr("x",128);

				

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

function arrowColor(d){
	if (d._event.eventSuccess) {
		return arrowSuccessStyle;
	}else{
		return arrowFailedStyle;
	};
}

Array.prototype.unique = function()
{
  var n = {},r=[];
  for(var i = 0; i < this.length; i++) 
  {
    if (!n[this[i]]) 
    {
      n[this[i]] = true; 
      r.push(this[i]); 
    }
  }
  return r;
}

// for (var i = 0; i < 1000; i++) {
// 	addEvent({eventType:"fromButton", eventName: "button", node1: "NODE1", node2: "NODE2"});
// 	}
