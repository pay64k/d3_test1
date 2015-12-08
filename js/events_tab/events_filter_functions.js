//---------------------------- Filtering functions ----------------------------

function filterEvents(data,filter){ 	//filter = {filterType: "byEventProperty", eventPropertyName: "eventType", eventProperty:"msgType1", visible: true }
										//filter = {filterType: "byEventEntry", rangeStart: 0, rangeEnd: 10, visible: true}
	var nodesAfected = [];
	switch(filter.filterType){
		case "byEventProperty":
			switch(filter.eventProperty){
				case "showAll":
					for (var i = 0; i < data.length; i++) {
						data[i].eventVisible = true;
						nodesAfected.push(data[i]);
					};
					break;

				case "hideAll":
					for (var i = 0; i < data.length; i++) {
						data[i].eventVisible = false;
						nodesAfected.push(data[i]);
					};
					break;

				default:
					nodesAfected = filterByProperty(data, filter.eventPropertyName, filter.eventProperty, filter.visible);
					break;
			}
			break;

		case "byEventEntry":
			filterByEntry(data, filter.rangeStart, filter.rangeEnd, filter.visible);
			break;

		default:
		break;
	}

	// update_events();
	// viewTop();
	return nodesAfected;
}

function filterByProperty(eventData, eventPropertyName, eventProperty, visible){
	var nodesAfected = [];
	for (var i = 0; i < eventData.length; i++) {
		if (eventData[i]._event[eventPropertyName] == eventProperty) {
			eventData[i].eventVisible = visible;
			nodesAfected.push(eventData[i]);
		}else{
			eventData[i].eventVisible = !visible;
		};
	};
	return nodesAfected;
}

function filterByEntry(eventData, rangeStart, rangeEnd, visible){
	if (rangeEnd > eventData.length) {
		rangeEnd = eventData.length;
	};
	for (var i = rangeStart-1; i < rangeEnd; i++) {
		eventData[i].eventVisible = visible;
	};
}

function applyFilterCombination(){
	var formsID = ["testSession","eventType", "node1", "node2", "eventSuccess"];
	var formsValues = [];
	var nodesAfected = [];
	for (var i = 0; i < formsID.length; i++) {
		var tempValue = document.getElementById(formsID[i]).value;
		
		if (tempValue == "true") {
			tempValue = true;
		};
		if (tempValue == "false") {
			tempValue = false;
		};
		
		formsValues.push(tempValue);
	};
	nodesAfected = filterEvents(events_data, {filterType: "byEventProperty", eventPropertyName: "testSession", eventProperty:"hideAll", visible: true });
	for (var i = 0; i < formsValues.length; i++) {
		nodesAfected = filterEvents(nodesAfected,{filterType: "byEventProperty", eventPropertyName: formsID[i], eventProperty:formsValues[i], visible: true });
	};

	events_data_paged = pageEvents(nodesAfected);
	populatePagingForm(events_data_paged.length);

	return nodesAfected;
}

function resetFilters(){

	var formsID = ["testSession","eventType", "node1", "node2", "eventSuccess"];

	for (var i = 0; i < formsID.length; i++) {
		document.getElementById(formsID[i]).value = "showAll";
	};

	updateEvents();

}


//---------------------------- Paging functions ----------------------------
var eventsPerPage = 10;

function setEventsPerPageAndSvgHeight(amount){
	eventsPerPage = amount;
	var svg = d3.select("#canvas_events").select("svg").style("height",getSVGHeight());
	applyFilterCombination();
}

function pageEvents(e_data) {

	var pageObject = {
		page: 0,
		events: []
	};
	var eventsAmount = e_data.length;
	if (eventsAmount == 0) {
		return [{page: 0, events: []}];
	} else {
		var pagesAmount = Math.ceil(eventsAmount / eventsPerPage);
		var pageContent = []; //[{page:1, events: [{123},{456}]},{page:2, events: [{1223},{4536}]}]

		var pageNumber = 1;
		var currentEventNumber = 0;


		for (var i = pageNumber; i <= pagesAmount; i++) {
			pageObject = { page: 0,events: [] };
			pageObject.page = i;
			for (currentEventNumber; currentEventNumber < eventsPerPage * pageNumber; currentEventNumber++) {
				if (e_data[currentEventNumber] == undefined) {
					break;
				};
					// if (currentEventNumber%2) {
					// 	e_data[currentEventNumber].odd = true;
					// }else{
					// 	e_data[currentEventNumber].odd = false;
					// };
				pageObject.events.push(e_data[currentEventNumber]);
			};

			for (var ii = 0; ii < pageObject.events.length; ii++) {
				
				if (ii%2) {
					pageObject.events[ii].odd = true;
				}else{
					pageObject.events[ii].odd = false;
				};
			};

			pageContent.push(pageObject);
			pageNumber++;
		};

		return pageContent;
	}
}