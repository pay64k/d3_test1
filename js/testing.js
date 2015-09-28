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