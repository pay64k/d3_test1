function testCreating(){

	createElementAndGroupNEW(treeData[0],"Client1", {name: "System2", type: "System", groupable: false, inner_children: ["a"]} ); 
		 createElementAndGroupNEW(treeData[0],"System2", {name: "TG1-1", type: "BTS", groupable: false} );
			 //createElementAndGroupNEW(treeData[0],"BTS2-1", {name: "TG1-1", type: "Talkgroup", groupable: false} );
				//createElementAndGroupNEW(treeData[0],"TG1-1", {name: "Radio1", type: "Radio", property1: "test", groupable: true} );
			createElementAndGroupNEW(treeData[0],"TG1-1", {name: "Radio2", type: "Radio", groupable: false} );

		//createElementAndGroupNEW(treeData[0],"System2", {name: "BTS2-5", type: "BTS", groupable: false} );

	createElementAndGroupNEW(treeData[0],"Client1", {name: "System1", type: "System", groupable: false} );
		 createElementAndGroupNEW(treeData[0],"System1", {name: "TG1-2", type: "BTS", groupable: false} );
			//createElementAndGroupNEW(treeData[0],"BTS1-1", {name: "TG1-2", type: "Talkgroup", groupable: false} );
				createElementAndGroupNEW(treeData[0],"TG1-2", {name: "Radio12", type: "Radio", property1: "test", groupable: true} );
				createElementAndGroupNEW(treeData[0],"TG1-2", {name: "Radio13", type: "Radio", groupable: true} );


} 

function testCreating_NEW(){
	newElement_op(treeData[0],"Client1", {name: "System3", type: "System", groupable: false} );
	newElement_op(treeData[0],"Client1", {name: "System2", type: "System", groupable: false} );
	newElement_op(treeData[0],"Client1", {name: "System1", type: "System", groupable: false} );

		newElement_op(treeData[0],"System1", {name: "Radio1", type: "Radio1", groupable: false} );
		newElement_op(treeData[0],"System1", {name: "Radio2", type: "Radio2", groupable: false} );
		newElement_op(treeData[0],"System1", {name: "Radio3", type: "Radio3", groupable: false} );
		newElement_op(treeData[0],"System1", {name: "Radio4", type: "Radio4", groupable: false} );
		newElement_op(treeData[0],"System1", {name: "Radio5", type: "Radio5", groupable: false} );
		newElement_op(treeData[0],"System1", {name: "Radio6", type: "Radio6", groupable: false} );
		newElement_op(treeData[0],"System1", {name: "Radio7", type: "Radio7", groupable: false} );
		newElement_op(treeData[0],"System1", {name: "Radio8", type: "Radio8", groupable: false} );
		newElement_op(treeData[0],"System1", {name: "Radio9", type: "Radio9", groupable: false} );

		newElement_op(treeData[0],"System2", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System2", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System2", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System2", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System2", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System2", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System2", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System2", {name: "Radio", type: "Radio", groupable: false} );

		newElement_op(treeData[0],"System3", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System3", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System3", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System3", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System3", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System3", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System3", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System3", {name: "Radio", type: "Radio", groupable: false} );
		newElement_op(treeData[0],"System3", {name: "Radio", type: "Radio", groupable: false} );

		newElement_op(treeData[0],"Client1", {name: "Group", type: "Radio", groupable: false} );
			newElement_op(treeData[0],"Group", {name: "hidden1", type: "Radio", groupable: true} );
			newElement_op(treeData[0],"Group", {name: "hidden2", type: "Radio", groupable: true} );
			newElement_op(treeData[0],"Group", {name: "hidden3", type: "Radio", groupable: true} );
			newElement_op(treeData[0],"Group", {name: "visible1", type: "Radio", groupable: false} );




	update(root);
}

function testCreating_report(){

}

function addTestEventsMore(){
	addEvent({testSession: "test1", eventSuccess: false, eventType:"msgType1", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, false);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType3", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE3", node2Type: "single" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType1", eventName: "event1", node1: "NODE2", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE3", node1Type: "single", node2: "NODE5", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: false, eventType:"msgType2", eventName: "event1", node1: "NODE4", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
		addEvent({testSession: "test1", eventSuccess: false, eventType:"msgType1", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, false);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType3", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE3", node2Type: "single" }, true);
	// addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType1", eventName: "event1", node1: "NODE2", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE3", node1Type: "single", node2: "NODE5", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: false, eventType:"msgType2", eventName: "event1", node1: "NODE4", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
		addEvent({testSession: "test1", eventSuccess: false, eventType:"msgType1", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	// addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, false);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType3", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE3", node2Type: "single" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType1", eventName: "event1", node1: "NODE2", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	// addEvent({testSession: "test2", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE3", node1Type: "single", node2: "NODE5", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: false, eventType:"msgType2", eventName: "event1", node1: "NODE4", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
		addEvent({testSession: "test1", eventSuccess: false, eventType:"msgType1", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, false);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType3", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE3", node2Type: "single" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType1", eventName: "event1", node1: "NODE2", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE3", node1Type: "single", node2: "NODE5", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: false, eventType:"msgType2", eventName: "event1", node1: "NODE4", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
				
}

function addTestEventLess(){
	addEvent({testSession: "test1", eventSuccess: false, eventType:"msgType1", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, false);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType3", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE3", node2Type: "single" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType1", eventName: "event1", node1: "NODE2", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE3", node1Type: "single", node2: "NODE5", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: false, eventType:"msgType2", eventName: "event1", node1: "NODE4", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
		addEvent({testSession: "test1", eventSuccess: false, eventType:"msgType1", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, false);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType3", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE3", node2Type: "single" }, true);
	addEvent({testSession: "test1", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType1", eventName: "event1", node1: "NODE2", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"shortData", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "group" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE3", node1Type: "single", node2: "NODE5", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: false, eventType:"msgType2", eventName: "event1", node1: "NODE4", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	addEvent({testSession: "test2", eventSuccess: true, eventType:"msgType2", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
}

function addMoreEvents(amount){
	for (var i = 0; i < amount; i++) {
	addEvent({testSession: "bigTest", eventSuccess: false, eventType:"msgType1", eventName: "event1", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }, true);
	};
}

var eventsTest = [  {testSession: "test1", eventSuccess: true, eventType:"mobility",          eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },  
                      {testSession: "test1", eventSuccess: true, eventType:"ind_call_simplex",  eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      // {testSession: "test1", eventSuccess: true, eventType:"ind_call_simplex",  eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"ind_call_duplex",   eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"ind_call_tx",       eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"ind_call_hang",     eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"ind_call_end",      eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"group_call",        eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"group_call_end",    eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"sd_single",         eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"sd_group",          eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"sd_report",         eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"sd_fail",           eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"status",            eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"status_ack",        eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" },
                      {testSession: "test1", eventSuccess: true, eventType:"status_nack",       eventName: "event2", node1: "NODE1", node1Type: "single", node2: "NODE2", node2Type: "single" }];

function addTestEventsGOOD(){
	for (var i = eventsTest.length - 1; i >= 0; i--) {
		addEvent( eventsTest[i], true);
	};
}