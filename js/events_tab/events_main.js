var heightCounter = 0 ;
var eventDistance = 130;
var scrollingSpeed = 50;
var offsetX_events = 75;
var offsetY_events = 30;
var eventEntryCounter = 1; //change to 1 later
var canvasHeight = 700;
	
var events_data = [];
var events_data_paged = [];

// var arrowHeadPathD = "m 210,8 16,-8 -16,-8 z";
// var arrowBodyPathD = "m 30,0 180,0";

var arrowPath_long 				= "m 35,0 180,0";
var arrowPath_long_reversed		= "m 215,0 -175,0";
var arrowPath_short 			= "m 30,0 90,0";
var arrowPath_short_reversed 	= "m 215,0 -87.5,0";

var arrowStyles_dashed_markerEnd 		= "stroke:#000000;stroke-width:2;marker-end:url(#endtriangle);stroke-dasharray:8, 3;stroke-dashoffset:0";
var arrowStyles_dashed_markerBoth 		= "stroke:#000000;stroke-width:2;marker-end:url(#endtriangle);marker-start: url(#starttriangle);stroke-dasharray:8, 3;stroke-dashoffset:0";
var arrowStyles_dashed_markerNone 		= "stroke:#000000;stroke-width:2;stroke-dasharray:8, 3;stroke-dashoffset:0";
var arrowStyles_continous_markerEnd 	= "stroke:#000000;stroke-width:2;marker-end:url(#endtriangle);";
var arrowStyles_continous_markerBoth	= "stroke:#000000;stroke-width:2;marker-end:url(#endtriangle);marker-start: url(#starttriangle);";
var arrowStyles_continous_markerNone 	= "stroke:#000000;stroke-width:2;";

var icon_path_newCall  	= "M24.905,26.431v-0.007l-3.813-6.445c-0.292-0.5-0.926-0.652-1.417-0.364l-2.271,1.346l0.187,0.314   c-1.006,0.452-1.898-0.569-3.48-2.714l-3.252-5.49c-0.643-1.404-1.15-2.83-0.174-3.519l0.104,0.178l2.27-1.342V8.383   c0.521-0.308,0.645-0.95,0.363-1.423V6.956L9.609,0.51c-0.291-0.5-0.926-0.654-1.416-0.364l-2.27,1.346l0.139,0.231   C4.805,2.758,1.66,7.643,7.899,18.479c6.475,11.246,12.645,11.176,14.21,10.448l0.159,0.273l2.271-1.341v-0.003   C25.061,27.546,25.183,26.905,24.905,26.431z";
var icon_path_endCall 	= "M0,17.366l0.02,2.576l0.002,0.004c0.006,0.588,0.485,1.008,1.022,1.004l0.006,0.004l7.313-0.059    c0.565-0.004,1.007-0.463,1-1.019l-0.021-2.578L8.987,17.3c0.111-1.07,1.411-1.323,4-1.609l6.231-0.052    c1.5,0.146,2.953,0.415,3.058,1.58l-0.199,0.002l0.021,2.573l0.001,0.003c0.005,0.594,0.486,1.012,1.023,1.006l0.006,0.006    l7.312-0.062c0.565-0.001,1.005-0.462,1.001-1.019l-0.021-2.575l-0.264,0.002c-0.258-1.566-2.843-6.622-15.053-6.668    C3.429,10.439,0.462,15.685,0.31,17.364L0,17.366z";
var icon_path_tx 		= "M122.54,301.304c28.648,28.655,61.832,56.046,74.943,42.929c18.782-18.775,30.355-35.129,71.747-1.863   c41.392,33.279,9.602,55.454-8.589,73.65c-20.991,20.992-99.239,1.102-176.583-76.234C6.722,262.442-13.175,184.195,7.83,163.196   c18.197-18.197,40.372-49.98,73.63-8.582c33.272,41.385,16.925,52.965-1.856,71.74C66.5,239.472,93.884,272.649,122.54,301.304z    M425.126,104.601c0,57.066-58.452,103.326-130.553,103.326c-7.208,0-14.232-0.585-21.121-1.469   c-19.618,20.081-49.585,29.838-83.626,32.381c13.94-13.94,23.915-34.17,27.043-51.34c-32.015-18.829-52.856-48.899-52.856-82.892   c0-57.065,58.453-103.326,130.554-103.326S425.126,47.535,425.126,104.601z M212.972,104.601c0,11.268,9.133,20.4,20.401,20.4   s20.4-9.132,20.4-20.4s-9.133-20.4-20.4-20.4S212.972,93.333,212.972,104.601z M314.973,104.601c0-11.268-9.132-20.4-20.399-20.4   s-20.4,9.132-20.4,20.4s9.133,20.4,20.4,20.4S314.973,115.868,314.973,104.601z M376.173,104.601c0-11.268-9.132-20.4-20.399-20.4   s-20.4,9.132-20.4,20.4s9.133,20.4,20.4,20.4S376.173,115.868,376.173,104.601z";
var icon_path_envelope 	= "M0,81.824v321.763h485.411V81.824H0z M242.708,280.526L43.612,105.691h398.187L242.708,280.526z    M163.397,242.649L23.867,365.178V120.119L163.397,242.649z M181.482,258.533l61.22,53.762l61.22-53.762L441.924,379.72H43.487   L181.482,258.533z M322.008,242.655l139.535-122.536v245.059L322.008,242.655z";
var icon_path_status	= "M62.162,0c6.696,0,10.043,4.567,10.043,9.789c0,6.522-5.814,12.555-13.391,12.555    c-6.344,0-10.045-3.752-9.869-9.947C48.945,7.176,53.35,0,62.162,0z M41.543,100c-5.287,0-9.164-3.262-5.463-17.615l6.07-25.457    c1.057-4.077,1.23-5.707,0-5.707c-1.588,0-8.451,2.816-12.51,5.59L27,52.406C39.863,41.48,54.662,35.072,61.004,35.072    c5.285,0,6.168,6.361,3.525,16.148L57.58,77.98c-1.234,4.729-0.703,6.359,0.527,6.359c1.586,0,6.787-1.963,11.896-6.041L73,82.377    C60.488,95.1,46.83,100,41.543,100z";
var icon_path_exchange1 = "M9.135,200.996h392.862v54.818c0,2.475,0.9,4.613,2.707,6.424c1.811,1.81,3.953,2.713,6.427,2.713    c2.666,0,4.856-0.855,6.563-2.569l91.365-91.362c1.707-1.713,2.563-3.903,2.563-6.565c0-2.667-0.856-4.858-2.57-6.567    l-91.07-91.078c-2.286-1.906-4.572-2.856-6.858-2.856c-2.662,0-4.853,0.856-6.563,2.568c-1.711,1.715-2.566,3.901-2.566,6.567    v54.818H9.135c-2.474,0-4.615,0.903-6.423,2.712S0,134.568,0,137.042v54.818c0,2.474,0.903,4.615,2.712,6.423    S6.661,200.996,9.135,200.996z";
var icon_path_exchange2 = "M502.49,310.637H109.632v-54.82c0-2.474-0.905-4.615-2.712-6.423c-1.809-1.809-3.951-2.712-6.424-2.712    c-2.667,0-4.854,0.856-6.567,2.568L2.568,340.607C0.859,342.325,0,344.509,0,347.179c0,2.471,0.855,4.568,2.568,6.275    l91.077,91.365c2.285,1.902,4.569,2.851,6.854,2.851c2.473,0,4.615-0.903,6.423-2.707c1.807-1.813,2.712-3.949,2.712-6.427V383.72    H502.49c2.478,0,4.613-0.899,6.427-2.71c1.807-1.811,2.707-3.949,2.707-6.427v-54.816c0-2.475-0.903-4.613-2.707-6.42    C507.103,311.54,504.967,310.637,502.49,310.637z";

var icon_style_green 	= "fill:#67D93B;stroke:#000000";
var icon_style_red 		= "fill:#D95E3B;stroke:#000000";
var icon_style_black 	= "fill:#000000;stroke:#000000";

// var arrowSuccessStyle = "fill:#000000;stroke:black;stroke-width:1px;"
// var arrowFailedStyle = "fill:#ff5656;stroke:#ff5656;stroke-width:1px;"

// var envelopePart1D = "m 100,-40 0,30 49,0 0,-30 z";
// var envelopePart2D = "M 100,-40 124,-20 149,-40";
// var envelopeStyles = "fill:none;stroke:#000000;stroke-width:3px;";

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
	    	.style("width", "100%");
	    	//.on("wheel.zoom", scrollFun)
	var defs = svg.append("defs");
		
		defs.append("marker")
			.attr("id","endtriangle")
			.attr("markerWidth", "10")
			.attr("markerHeight", "10")
			.attr("viewBox", "0 0 10 10")
			.attr("markerUnits", "strokeWidth")
			.attr("refX", "2")
			.attr("refY", "5")
			.attr("orient", "auto")
				.append("path")
				.attr("d", "M 0 0 L 10 5 L 0 10 z")
				.style("fill", "#000000");

		defs.append("marker")
			.attr("id","starttriangle")
			.attr("markerWidth", "10")
			.attr("markerHeight", "10")
			.attr("viewBox", "-2 0 10 10")
			.attr("markerUnits", "strokeWidth")
			.attr("refX", "0")
			.attr("refY", "5")
			.attr("orient", "auto")
				.append("path")
				.attr("d", "M -2 5 L 8 0 L 8 10 z")
				.style("fill", "#000000");

	svg.append("g")
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
		applyFilterCombination();
		updateEventForms();
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
 	client.send(queueSendTo, {priority: 9}, JSON.stringify(request));
}

// function requestCurrentEventAmount(){
// 	var request = {command: "REQUEST_EV_CURR_AMOUNT"};
//  	client.send("/queue/example_QD1", {priority: 9}, JSON.stringify(request));
// }

// function scrollFun(){
// 	dx = d3.event.wheelDeltaX;
//     dy = d3.event.wheelDeltaY;

//     var group = d3.select("#events_group");
//     var currentPostitionY = d3.transform(group.attr("transform")).translate[1];
//     //console.log(currentPostitionY);
//     if (dy < 0) {
// 		group
// 		.transition().duration(20)
// 		.attr("transform", "translate(" + offsetX_events + "," + (currentPostitionY - scrollingSpeed) + ")");
//     }else{
//     	group
// 		.transition().duration(20)
//     	.attr("transform", "translate(" + offsetX_events + "," + (currentPostitionY + scrollingSpeed) + ")");
// 	};

// }

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
						.attr("id", "node1_circle")
						.attr("r", 10);

	events_groupEnter.append("text")
			.text(function(d) { return d._event.node1; })
			.attr("text-anchor", "middle")
			.attr("y",35);

	events_groupEnter.append("circle")
						.attr("id", "node2_circle")
						.attr("r", 10)
						.attr("cx", 256);

	events_groupEnter.append("text")
			.text(function(d) { return d._event.node2; })
			.attr("text-anchor", "middle")
			.attr("y",35)
			.attr("x",256);


	events_groupEnter.each(function(d){
		var thisGroup = d3.select(this);
		var eventType = d._event.eventType;
		// console.log(eventType);
		switch(eventType){

			case "mobility":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long);
				arrow.attr("style", arrowStyles_dashed_markerEnd);
				break;

			case "ind_call_simplex":
				var arrow = thisGroup.append("path").attr("d",arrowPath_short);
				arrow.attr("style", arrowStyles_continous_markerEnd);

				var icon = thisGroup.append("path").attr("d",icon_path_newCall);
				icon.attr("transform","translate(110,-35)")
				icon.attr("style", icon_style_green);
				break;

			case "ind_call_duplex":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long);
				arrow.attr("style", arrowStyles_continous_markerBoth);

				thisGroup.append("path").attr("d",icon_path_exchange1)
					.attr("transform","translate(110,-35)scale(0.07)")
					.attr("style", icon_style_black);	
				thisGroup.append("path").attr("d",icon_path_exchange2)
					.attr("transform","translate(110,-35)scale(0.07)")
					.attr("style", icon_style_black);	

				break;	

			case "ind_call_tx":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long);
				arrow.attr("style", arrowStyles_continous_markerEnd);

				var icon = thisGroup.append("path").attr("d",icon_path_tx);
				icon.attr("transform","translate(110,-35)scale(0.07)")
				icon.attr("style", icon_style_black);
				break;

			case "ind_call_hang":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long);
				arrow.attr("style", arrowStyles_continous_markerNone);
				break;

			case "ind_call_end":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long);
				arrow.attr("style", arrowStyles_continous_markerEnd);

				var icon = thisGroup.append("path").attr("d",icon_path_endCall);
				icon.attr("transform","translate(110,-35)")
				icon.attr("style", icon_style_red);
				break;

			case "group_call":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long);
				arrow.attr("style", arrowStyles_continous_markerEnd);
				thisGroup.append("circle")
					.attr("r", 10)
	  				.attr("cx", 256 + 5 )
	  				.attr("cy", 5);
				thisGroup.append("circle")
					.attr("r", 10)
	  				.attr("cx", 256 + 10 )
	  				.attr("cy", 10);
				break;

			case "group_call_hang":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long);
				arrow.attr("style", arrowStyles_continous_markerNone);
				thisGroup.append("circle")
					.attr("r", 10)
	  				.attr("cx", 256 + 5 )
	  				.attr("cy", 5);
				thisGroup.append("circle")
					.attr("r", 10)
	  				.attr("cx", 256 + 10 )
	  				.attr("cy", 10);
				break;		

			case "group_call_end":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long);
				arrow.attr("style", arrowStyles_continous_markerEnd);
				thisGroup.append("circle")
					.attr("r", 10)
	  				.attr("cx", 256 + 5 )
	  				.attr("cy", 5);
				thisGroup.append("circle")
					.attr("r", 10)
	  				.attr("cx", 256 + 10 )
	  				.attr("cy", 10);
				var icon = thisGroup.append("path").attr("d",icon_path_endCall);
				icon.attr("transform","translate(110,-35)")
				icon.attr("style", icon_style_red);
				break;

			case "sd_single":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long);
				arrow.attr("style", arrowStyles_continous_markerEnd);

				var icon = thisGroup.append("path").attr("d",icon_path_envelope);
				icon.attr("transform","translate(110,-35)scale(0.07)")
				icon.attr("style", icon_style_black);
				break;

			case "sd_group":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long);
				arrow.attr("style", arrowStyles_continous_markerEnd);

				thisGroup.append("circle")
					.attr("r", 10)
	  				.attr("cx", 256 + 5 )
	  				.attr("cy", 5);
				thisGroup.append("circle")
					.attr("r", 10)
	  				.attr("cx", 256 + 10 )
	  				.attr("cy", 10);

				var icon = thisGroup.append("path").attr("d",icon_path_envelope);
				icon.attr("transform","translate(110,-35)scale(0.07)")
				icon.attr("style", icon_style_black);
				break;	

			case "sd_report":			
				var arrow = thisGroup.append("path").attr("d",arrowPath_long_reversed);
				arrow.attr("style", arrowStyles_continous_markerEnd);

				var icon = thisGroup.append("path").attr("d",icon_path_envelope);
				icon.attr("transform","translate(110,-35)scale(0.07)")
				icon.attr("style", icon_style_green);
				break;

			case "sd_fail":			
				var arrow = thisGroup.append("path").attr("d",arrowPath_short_reversed);
				arrow.attr("style", arrowStyles_continous_markerEnd);

				var icon = thisGroup.append("path").attr("d",icon_path_envelope);
				icon.attr("transform","translate(110,-44)scale(0.07)")
				icon.attr("style", icon_style_red);
				break;

			case "status":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long);
				arrow.attr("style", arrowStyles_continous_markerEnd);

				var icon = thisGroup.append("path").attr("d",icon_path_status);
				icon.attr("transform","translate(110,-40)scale(0.33)")
				icon.attr("style", icon_style_black);
				break;

			case "status_ack":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long_reversed);
				arrow.attr("style", arrowStyles_continous_markerEnd);

				var icon = thisGroup.append("path").attr("d",icon_path_status);
				icon.attr("transform","translate(110,-40)scale(0.33)")
				icon.attr("style", icon_style_green);
				break;

			case "status_nack":
				var arrow = thisGroup.append("path").attr("d",arrowPath_long_reversed);
				arrow.attr("style", arrowStyles_continous_markerEnd);

				var icon = thisGroup.append("path").attr("d",icon_path_status);
				icon.attr("transform","translate(110,-40)scale(0.33)")
				icon.attr("style", icon_style_red);
				break;

			default:
			break;
		}
	});

	events_groupEnter.append("text")
			.text(function(d) { return "Type: " + d._event.eventType; })
			.attr("text-anchor", "middle")
			.attr("y",25)
			.attr("x",128);

	events_groupEnter.append("text")
			.text(function(d) { return "Name: " + d._event.eventName; })
			.attr("text-anchor", "middle")
			.attr("y",45)
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

function timeConv(){
	var epoch = 1234567890000;
	var epochInt = parseInt(epoch);
	
	var d = new Date(epoch)
	var d = new Date(epochInt)

	var epoch = (new Date).getTime();

}
