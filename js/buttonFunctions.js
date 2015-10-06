var addedRadiosNamesType1 = [];
var addedRadiosNamesType2 = [];
function testClick1(){

  var name =  "" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
addElementAndGroup(treeData[0],"BTS2-1",["name", name, "type","Radio", "property1", "test"]);
addedRadiosNamesType1.push(name);
}
function testClick2(){
var name =  "" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
addElementAndGroup(treeData[0],"BTS2-1",["name", name, "type","RadioNEW", "property1", "test"]);
addedRadiosNamesType2.push(name);
}

function testDeleteAndUngroupUsage1(){
  var name = addedRadiosNamesType1.shift();
  //console.log("Delete " + name);
  delElementAndUngroup(treeData[0],name);
}

function testDeleteAndUngroupUsage2(){
  var name = addedRadiosNamesType2.shift();
  delElementAndUngroup(treeData[0],name);
}

function centerView(){

 var _svg = d3.select("svg").select("g");
       zoom.translate([offsetX, offsetY]);
       zoom.scale(1);
       _svg.transition()
           .duration(750)
           .attr("transform", "translate(" + offsetX + "," + offsetY + " )scale(1)");

}


function populateForm(formID){
  
  var nodes = d3.selectAll(".node").data();
  var names = [];
    for (var i = 0; i < nodes.length; i++) {
      names.push(nodes[i].name);
    };

  names.sort(function (a, b) {
  if (a> b) {
    return 1;
  }
  if (a< b) {
    return -1;
  }
  // a must be equal to b
  return 0;
  });

  var select = document.getElementById(formID);
  if (select != null) {
    select.options.length = 0;  //reset for no repeats
      for(var i = 0; i < names.length; i++) {
       select.options[select.options.length] = new Option(names[i], i);
      };
  };

return names;

}

function updateForms(){
  populateForm("linkFrom");
  populateForm("linkTo");
  debugLog(">>>Forms Updated!");
}


function submitNewLink(){
  var formFrom = document.getElementById("linkFrom");
  var selectedFrom = formFrom.options[formFrom.selectedIndex].text;
  var formTo = document.getElementById("linkTo");
  var selectedTo = formTo.options[formTo.selectedIndex].text;
  var linkName = "Link" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  linkNamesGLOBAL.push(linkName);
  addLink(selectedFrom,selectedTo,linkName);
}

function delLastLink(){
  removeLink(linkNamesGLOBAL.pop());
}

function randomLink(){
  var names = populateForm();
  var linkName = "Link" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  linkNamesGLOBAL.push(linkName);
  addLink(names[Math.floor(Math.random() * names.length) + 1], names[Math.floor(Math.random() * names.length) + 1],linkName);
  
}

function clearAllLinks(){
  for (var i = 0; i < linkNamesGLOBAL.length; i++) {
    removeLink(linkNamesGLOBAL[i]);
  };
  linkNamesGLOBAL=[];
}

function singleLink(){
  clearAllLinks();
  randomLink();
}