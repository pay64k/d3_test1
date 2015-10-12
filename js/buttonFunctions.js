var addedRadiosNamesType1 = [];
var addedRadiosNamesType2 = [];
function testClick1(){

  var name =  "" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
createElementAndGroup(treeData[0],"BTS2-1",["name", name, "type","Radio", "property1", "test"]);
addedRadiosNamesType1.push(name);
}
function testClick2(){
var name =  "" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
createElementAndGroup(treeData[0],"BTS2-1",["name", name, "type","RadioNEW", "property1", "test"]);
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

function focusView(){


var t = d3.transform(d3.select("svg").select("g").attr("transform")),
    x0 = t.translate[0],
    y0 = t.translate[1];

console.log("View: x: "+ x0 + ", y: " + y0);

var focusForm = document.getElementById("focusForm");
var nodeName = focusForm.options[focusForm.selectedIndex].text;
var node = findNodeByName(nodeName);
 var x = node.y + y0;
 var y = node.x + x0;

console.log("Node: x: " + x + ", y: " + y);

var diffX = x0-x, diffY = y0-y;

console.log("Diff: x: " + diffX + ", y:" + diffY);
console.log("-----------------");

 var _svg = d3.select("svg").select("g");
       zoom.translate([x, y]);
       zoom.scale(1);
       _svg.transition()
           .duration(750)
           .attr("transform", "translate(" + (x) + "," + (y) + " )scale(1)");
}

function getAllNames(){
  var names = [];
  var q = new Queue();
    q.enqueue(root); 
    while (true) {
        var node = q.dequeue();

        if (node == undefined){
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
          return names;
        };

        if (node)
        {
            names.push(node.name);
        }
        
        if (node.children != undefined)
        {
            for (var i=0, c=node.children.length; i<c; i++) {
                q.enqueue(node.children[i]);
            }
        }

        if (node._children != undefined) 
        {
            for (var i=0, c=node._children.length; i<c; i++) {
                q.enqueue(node._children[i]);
            }
        }
    }

}

function populateForm(formID){

  var names = getAllNames();
  var select = document.getElementById(formID);
  if (select != null) {
    select.options.length = 0;  //reset for no repeats
      for(var i = 0; i < names.length; i++) {
       select.options[select.options.length] = new Option(names[i], i);
      };
  };

}

function updateForms(){
  populateForm("linkFrom");
  populateForm("linkTo");
  populateForm("focusForm");
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
  var names = getAllNames();
  var linkName = "Link" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  linkNamesGLOBAL.push(linkName);
  addLink(names[Math.floor(Math.random() * names.length)], names[Math.floor(Math.random() * names.length)],linkName);
  
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