var heightCounter = 0 ;
var eventDistance = 100;
var scrollSpeed = 70;
	
var events_data = 	[	{eventEntry: "1", eventVisible: true, _event: 	{eventType:"msgType1", eventName: "event1", node1: "NODE1", node2: "NODE2"} }, 
						{eventEntry: "2", eventVisible: false, _event: 	{eventType:"msgType2", eventName: "event2", node1: "NODE1", node2: "NODE2"} }, 
						{eventEntry: "3", eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event3", node1: "NODE1", node2: "NODE2"} }, 
						{eventEntry: "4", eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event4", node1: "NODE1", node2: "NODE2"} }, 
						{eventEntry: "5", eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event5", node1: "NODE1", node2: "NODE2"} }, 
						{eventEntry: "6", eventVisible: true, _event: 	{eventType:"msgType3", eventName: "event6", node1: "NODE1", node2: "NODE2"} },
						{eventEntry: "7", eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event7", node1: "NODE1", node2: "NODE2"} }, 
						{eventEntry: "8", eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event8", node1: "NODE1", node2: "NODE2"} }, 
						{eventEntry: "9", eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event9", node1: "NODE1", node2: "NODE2"} }, 
						{eventEntry: "10", eventVisible: true, _event: 	{eventType:"msgType2", eventName: "event10", node1: "NODE1", node2: "NODE2"} }, 
					
					];

function events_init(){
	var offsetX = 50;
	var offsetY = 30;

	var svg = d3.select("#canvas_events")
	.style("width", "500px")
	.style("height", "700px")
		.append("svg")
	    	.style("display", "block") 
	    	.style("height", "100%")
	    	.style("width", "100%")
	    	.on("wheel.zoom", scrollFun)
	    		.append("g")
	    			.attr("transform", "translate(" + offsetX + "," + offsetY + ")")
	    			.attr("id", "events_group");
}

function scrollFun(){
	dx = d3.event.wheelDeltaX;
    dy = d3.event.wheelDeltaY;

    //console.log(dx + " | " + dy);

    var group = d3.select("#events_group");
    var currentPostitionY = d3.transform(group.attr("transform")).translate[1];

    if (dy < 0) {
    	group
    	.transition().duration(150)
    	.attr("transform", "translate(" + 50 + "," + (currentPostitionY - scrollSpeed) + ")");
    }else{
    	group
		.transition().duration(150)
    	.attr("transform", "translate(" + 50 + "," + (currentPostitionY + scrollSpeed) + ")");
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
			events_data[i].y = 0;
		};
		
	};

	var events_group = d3.select("#events_group").selectAll("g").data( events_data.filter(function(d){ return d.eventVisible ? d.eventEntry : null }), function(d) {return d.eventEntry} );
	
	var events_groupEnter = events_group.enter().append("g")			
			.attr("id", function(d) { return d._event.eventName; } )
			.attr("class", "node")
			.attr("transform", function(d, i) { return "translate(" + (-300) + "," + d.y + ") scale(0)"; });
			
	events_groupEnter.append("circle")
			.attr("r", 10);

	events_groupEnter.append("text")
			.text(function(d) { return d._event.eventName; })
			.attr("text-anchor", "middle")
			.attr("y",20);
				

	var events_groupUpdate = events_group.transition()
		.duration(500)
		.ease("bounce")
		.attr("transform", function(d,i) { return "translate(" + d.x + "," + d.y + ") scale(1)"; });

	var events_groupExit = events_group.exit().transition()
		.duration(500)
		.attr("transform", function(d) { return "translate(" + 300+ "," + d.y + ") scale(0)"; })
		.remove();
}

