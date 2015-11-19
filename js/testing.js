function testCreating(){

	createElementAndGroupNEW(treeData[0],"Client1", {name: "System2", type: "System", groupable: false} ); 
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

