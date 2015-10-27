
 function testAdding(){

var bla = createElement("Test BTS3");

addElement(treeData[0],"System1",bla);

var bla = createElement("Test radio1");

addElement(treeData[0],"Test BTS3",bla);

var bla = createElement("Test BTS2");

addElement(treeData[0],"System1",bla);

var bla = createElement("Test radio2");

addElement(treeData[0],"Test BTs",bla);
addElement(treeData[0],"Test BT2",bla);
addElement(treeData[0],"Test BT2",bla);

var bla = createElement("Test radio3");

addElement(treeData[0],"Test radio1",bla);
var bla = createElement("Test radio4");
addElement(treeData[0],"Test radio3",bla);

 }


 function testDeleting(){
 	var bla = createElement("DELETE");
	addElement(treeData[0],"BTS2",bla);
 	delElement(treeData[0],"DELETE");
 }

function testCreating(){
	//createTree("Client1");
	// addElement(treeData[0], "Client1", createElement(["name","System1","MNI","111","MNC","222"]));
	//  	addElement(treeData[0], "System1", createElement(["name","BTS1-1"]));
	// 		addElement(treeData[0], "BTS1-1", createElement(["name", "Radio1-1"]));	
	// 		addElement(treeData[0], "BTS1-1", createElement(["name", "Radio1-2"]));
	// 		addElement(treeData[0], "BTS1-1", createElement("Radio1-3"));			//wrong example
	// 		addElement(treeData[0], "BTS1-1", createElement(["name", "Radio1-3"]));
	// addElement(treeData[0], "Client1", createElement(["name", "System2"]));
	// 	// addElement(treeData[0], "System2", createElement(["name", "BTS2-1"]));
	// 	// 	addElement(treeData[0], "BTS2-1", createElement(["name", "Radio1-1"]));	
	// 	// 	addElement(treeData[0], "BTS2-1", createElement(["name", "Radio1-1"]));
	// 	// 	addElement(treeData[0], "BTS2-1", createElement(["name", "Radio1-2"]));	
	// 	addElement(treeData[0], "System2", createElement(["name", "BTS2-2"]));
	// 		addElement(treeData[0], "BTS2-2", createElement(["name", "Radio1-1"]));
	// 		addElement(treeData[0], "BTS2-2", createElement(["name", "Radio1-2"]));
	// 		addElement(treeData[0], "BTS2-2", createElement(["name", "Radio1-3"]));
	// 		groupElements(treeData[0],"BTS2-2");
	// 		addElement(treeData[0], "BTS2-2", createElement(["name", "Radio1-4"]));
	// 		groupElements(treeData[0],"BTS2-2");
	//update(root);
	createElementAndGroupNEW(treeData[0],"Client1",["name", "System2", "type","System"], false);
		 createElementAndGroupNEW(treeData[0],"System2",["name", "BTS2-1", "type","BTS"], false);
		//  createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Group1", "type","group"]);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio1", "type","Radio", "property1", "test"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio2", "type","Radio"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio3", "type","Radio"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio4", "type","Radio"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio5", "type","Radio"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio6", "type","Radio"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio7", "type","Radio"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio8", "type","Radio"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio9", "type","Radio"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio10", "type","Radio"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio11", "type","Radio"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio12", "type","RadioNEW"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio13", "type","RadioNEW"], true);
			createElementAndGroupNEW(treeData[0],"BTS2-1",["name", "Radio14", "type","Radio"], false);
		// createElementAndGroup(treeData[0],"System2",["name", "BTS2-2", "type","BTS"]);
		// createElementAndGroup(treeData[0],"System2",["name", "BTS2-3", "type","BTS"]);
		// createElementAndGroup(treeData[0],"System2",["name", "BTS2-4", "type","BTS"]);
		createElementAndGroupNEW(treeData[0],"System2",["name", "BTS2-5", "type","BTS"], false);
			//createElementAndGroup(treeData[0],"BTS2-5",["name", "bla1", "type","Something1"]);
			// createElementAndGroup(treeData[0],"BTS2-5",["name", "bla2", "type","Something1"]);
			// createElementAndGroup(treeData[0],"BTS2-5",["name", "bla3", "type","Something1"]);
			// createElementAndGroup(treeData[0],"BTS2-5",["name", "bla4", "type","Something2"]);
			// createElementAndGroup(treeData[0],"BTS2-5",["name", "bla5", "type","Something2"]);
			// createElementAndGroup(treeData[0],"BTS2-5",["name", "bla6", "type","Something2"]);
		// createElementAndGroup(treeData[0],"System2",["name", "BTS2-6", "type","BTS"]);
		// createElementAndGroup(treeData[0],"System2",["name", "BTS2-7", "type","BTS"]);

} 

function testChanging(){
	var bla = createElement("")
}

var test = {
			"name": "test",
			"property1": 1,
			"property2": 2
			};

function testOptimizing(){
	createElementAndGroup2(treeData[0],"Client1",["name", "System2", "type","System"]);
		createElementAndGroup2(treeData[0],"System2",["name", "BTS2-1", "type","BTS"]);
}

function testNewLink(startNodeName,endNodeName){

	activateElement(treeData[0],startNodeName);
	activateElement(treeData[0],endNodeName);
	var link = addLink(startNodeName, endNodeName, "123", 1, 0);
	linksGLOBAL.push(link);

}

function testAddMultipleLinks(startNodeName){
	var endNodeNames = ["Radio9", "Radio10", "Radio11", "Radio12", "Radio14"];
	//endNodeNames = group;
	activateElement(treeData[0],startNodeName);
	for (var i = 0; i < endNodeNames.length; i++) {
		activateElement(treeData[0],endNodeNames[i]);
		var link = addLink(startNodeName, endNodeNames[i], ("Link" + i) , i, 0);
		linksGLOBAL.push(link);
	};
}

function testDeleteLinkAndDeactivate(linkID){

	var deletedLink = removeLink(linkID)[0];

	var startNode = deletedLink[0];
	var endNode = deletedLink[1];

	var temp = startNode.linkedTo.splice(startNode.linkedTo.indexOf(endNode),1);
	var temp = endNode.linkedTo.splice(endNode.linkedTo.indexOf(startNode),1);

	if (startNode.linkedTo.length == 0) {
		deactivateElement(treeData[0], startNode.name);	
	};
	if (endNode.linkedTo.length == 0) {
		deactivateElement(treeData[0], endNode.name);	
	};
	
	
	update(root);
	updateLinks();
}

