function events_init(){
	var svg = d3.select("#canvas_events")
	.style("width", "500px")
	.append("svg")
    	.attr("width", 500)
    	.attr("height", 705)  
    		.append("g")
    			.attr("transform", "translate(" + 20 + "," + 20 + ")")
    			.attr("id", "events_group");
}

var events_data = [{eventType:"msg1", node1: "NODE1", node2: "NODE2"}, {eventType:"msg2", node1: "NODE1", node2: "NODE2"}, {eventType:"msg3", node1: "NODE1", node2: "NODE2"}];
var test_data = [10,20,300];

function update_events(){

}

var eventDistance = 100;

function testDraw(){
	var events_groupEnter = d3.select("#events_group").selectAll("g").data(events_data).enter()
		.append("g")
		.attr("class", "node")
		.attr("transform", function(d, i) { return "translate(" + 20 + "," + i * eventDistance + ")"; })
			.append("circle")
			.attr("r", 10);
			

	events_groupEnter = d3.select("#events_group").selectAll("g").data(events_data).exit().remove();
}
