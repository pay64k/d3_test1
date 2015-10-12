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

function addMore(amount){
for (var i = 0; i < amount; i++) {
  testClick1();
};
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


// var t = d3.transform(d3.select("svg").select("g").attr("transform")),
//     x0 = t.translate[0],
//     y0 = t.translate[1];

//console.log("View: x: "+ x0 + ", y: " + y0);

var focusForm = document.getElementById("focusForm");
var nodeName = focusForm.options[focusForm.selectedIndex].text;
var node = findNodeByName(nodeName);


 //if (node.parent.hidden) {
  unhideParents(node);
  update(root);
 //};

//console.log("Node: x: " + x + ", y: " + y);
 var x = node.y;
 var y = node.x;
var newX = offsetX - x;
var newY = offsetY - y;

//console.log("Diff: x: " + diffX + ", y:" + diffY);
//console.log("-----------------");

 var _svg = d3.select("svg").select("g");
       zoom.translate([newX, newY]);
       zoom.scale(1);
       _svg.transition()
           //.delay(300)
           .duration(650)
           .attr("transform", "translate(" + (newX) + "," + (newY) + " )scale(1)");
//chech if parent hiddden, if yes unhide
var nodeAnimate = d3.selectAll(".node").filter( function(d,i){return d.name == nodeName ;} );

  nodeAnimate.select("circle")
      .transition()
        .duration(700)
        .delay(300)
        .attr("r",20)
        .style("fill-opacity", 1)
        .style("fill", "#ED5151")
          .each("end", function() { 
            d3.select(this).transition()
            .duration(200)
            .style("fill", "white")
            .style("fill-opacity", 1)
            .attr("r",10)});
      
      //.attr("r",10);
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
  updateLinkForm();
  debugLog(">>>Forms Updated!");
}


function submitNewLink(){
  var formFrom = document.getElementById("linkFrom");
  var selectedFrom = formFrom.options[formFrom.selectedIndex].text;
  var formTo = document.getElementById("linkTo");
  var selectedTo = formTo.options[formTo.selectedIndex].text;
  var linkName = "Link" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  linkNamesGLOBAL.push(linkName);
  var link = addLink(selectedFrom,selectedTo,linkName,3);
  linksGLOBAL.push(link);
}

function delLastLink(){
  //removeLink(linkNamesGLOBAL.pop());
  removeLink(linksGLOBAL[linksGLOBAL.length-1][3]);
}

function randomLink(){
  var names = getAllNames();
  var linkName = "Link" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  //linkNamesGLOBAL.push(linkName);
  var link = addLink(names[Math.floor(Math.random() * names.length)], names[Math.floor(Math.random() * names.length)],linkName, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1 );
  linksGLOBAL.push(link);
}

function clearAllLinks(){
  // for (var i = 0; i < linkNamesGLOBAL.length; i++) {
  //   removeLink(linkNamesGLOBAL[i]);
  // };
  // linkNamesGLOBAL=[];

for (var i = linksGLOBAL.length - 1; i >= 0; i--) {
  removeLink(linksGLOBAL[i][3]);
};

}

function singleLink(){
  clearAllLinks();
  randomLink();
}

function delSpecificLink(){
  var linkForm = document.getElementById("specificLink");
  var selectedLink = linkForm.options[linkForm.selectedIndex].text;
  removeLink(selectedLink);
  //updateLinkForm();
}

function updateLinkForm(){
  var linkNames = [];
  for (var i = 0; i < linksGLOBAL.length; i++) {
    linkNames.push(linksGLOBAL[i][3]);
  };

var select = document.getElementById("specificLink");
  if (select != null) {
    select.options.length = 0;  //reset for no repeats
      for(var i = 0; i < linkNames.length; i++) {
       select.options[select.options.length] = new Option(linkNames[i], i);
      };
  };

}