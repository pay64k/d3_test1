
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
	addElementAndGroup(treeData[0],"Client1",["name", "System2"]);
		addElementAndGroup(treeData[0],"System2",["name", "BTS2-1"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio1", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio2", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio3", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio4", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio5", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio6", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio7", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio8", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio9", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio10", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio11", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio12", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio13", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "Radio14", "type","radio"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "bla1", "type","something"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "bla2", "type","something"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "bla3", "type","something"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "bla4", "type","something"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "bla5", "type","something"]);
			addElementAndGroup(treeData[0],"BTS2-1",["name", "bla6", "type","something"]);
		addElementAndGroup(treeData[0],"System2",["name", "BTS2-2"]);
		addElementAndGroup(treeData[0],"System2",["name", "BTS2-3"]);
		addElementAndGroup(treeData[0],"System2",["name", "BTS2-4"]);
		addElementAndGroup(treeData[0],"System2",["name", "BTS2-1"]);

} 

function testChanging(){
	var bla = createElement("")
}

var test = {
			"name": "test",
			"property1": 1,
			"property2": 2
			};