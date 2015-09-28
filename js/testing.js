
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
	addElement(treeData[0], "Client1", createElement(["name","System1","MNI","111","MNC","222"]));
	 	addElement(treeData[0], "System1", createElement(["name","BTS1-1"]));
			addElement(treeData[0], "BTS1-1", createElement("Radio1-1"));	
			addElement(treeData[0], "BTS1-1", createElement("Radio1-2"));
			addElement(treeData[0], "BTS1-1", createElement("Radio1-3"));	
	addElement(treeData[0], "Client1", createElement("System2"));
		addElement(treeData[0], "System2", createElement("BTS2-1"));
			addElement(treeData[0], "BTS2-1", createElement("Radio1-1"));	
			addElement(treeData[0], "BTS2-1", createElement("Radio1-2"));
			addElement(treeData[0], "BTS2-1", createElement("Radio1-3"));	
		addElement(treeData[0], "System2", createElement("BTS2-2"));
			addElement(treeData[0], "BTS2-2", createElement("Radio1-1"));
			addElement(treeData[0], "BTS2-2", createElement("Radio1-2"));
	update(root);

} 

function testChanging(){
	var bla = createElement("")
}

var test = {
			"name": "test",
			"property1": 1,
			"property2": 2
			};