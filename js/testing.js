function testCreating(){

	createElementAndGroupNEW(treeData[0],"Client1", {name: "System2", type: "System", groupable: false} ); 
		 createElementAndGroupNEW(treeData[0],"System2", {name: "BTS2-1", type: "BTS", groupable: false} );
			 createElementAndGroupNEW(treeData[0],"BTS2-1", {name: "TG1-1", type: "Talkgroup", groupable: false} );
				//createElementAndGroupNEW(treeData[0],"TG1-1", {name: "Radio1", type: "Radio", property1: "test", groupable: true} );
			createElementAndGroupNEW(treeData[0],"BTS2-1", {name: "Radio2", type: "Radio", groupable: false} );

		createElementAndGroupNEW(treeData[0],"System2", {name: "BTS2-5", type: "BTS", groupable: false} );

	createElementAndGroupNEW(treeData[0],"Client1", {name: "System1", type: "System", groupable: false} );
		 createElementAndGroupNEW(treeData[0],"System1", {name: "BTS1-1", type: "BTS", groupable: false} );
			createElementAndGroupNEW(treeData[0],"BTS1-1", {name: "TG1-2", type: "Talkgroup", groupable: false} );
				createElementAndGroupNEW(treeData[0],"TG1-2", {name: "Radio12", type: "Radio", property1: "test", groupable: true} );
				createElementAndGroupNEW(treeData[0],"TG1-2", {name: "Radio13", type: "Radio", groupable: true} );


} 



