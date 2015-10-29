var addedRadiosNamesType1 = [];
var addedRadiosNamesType2 = [];

function testClick1(){

  var name =  "R" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  createElementAndGroupNEW(treeData[0],"TG1-1",["name", name, "type","Radio", "property1", "test"],true);
  addedRadiosNamesType1.push(name);
  //update(root);
}
function testClick2(){

  var name =  "" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  createElementAndGroupNEW(treeData[0],"TG1-2",["name", name, "type","RadioNEW", "property1", "test"],true);
  addedRadiosNamesType2.push(name);
}

function addMore(amount){
    var startTime = new Date();

for (var i = 0; i < amount; i++) {
  testClick1();
};
    update(root);
    var endTime = new Date();
    console.log("\t>>Time spent createElementAndGroup " + (endTime - startTime) );

}

function testDeleteAndUngroupUsage1(){
  var name = addedRadiosNamesType1.shift();
  //console.log("Delete " + name);
  deleteElement(treeData[0],name);
}

function testDeleteAndUngroupUsage2(){
  var name = addedRadiosNamesType2.shift();
  deleteElement(treeData[0],name);
}

function centerView(){

 var _svg = d3.select("svg").select("g");
       zoom.translate([100, offsetY]);
       zoom.scale(1);
       _svg.transition()
           .duration(750)
           .attr("transform", "translate(" + 100 + "," + offsetY + " )scale(1)");

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
  activateElement(treeData[0],node.name);
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
            .duration(1000)
            .style("fill", "white")
            .style("fill-opacity", 1)
            .attr("r",10)
              .each("end",function(){
                update(root);
              })
            deactivateElement(treeData[0],node.name);
            });
      
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

        if (node.inner_children != undefined) 
        {
            for (var i=0, c=node.inner_children.length; i<c; i++) {
                q.enqueue(node.inner_children[i]);
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

  var randomColor = Math.floor(Math.random() * 10) + 1;
  var linkName = "Link" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;

  linkNamesGLOBAL.push(linkName);
  newLinkAndActivate(selectedFrom, selectedTo, linkName, randomColor);
}

function delLastLink(){
  //removeLink(linkNamesGLOBAL.pop());
  //removeLink(linksGLOBAL[linksGLOBAL.length-1][3]);
  deleteLinkAndDeactivate(linksGLOBAL[linksGLOBAL.length-1][3]);

  update(root);
  updateLinks();
}

function randomLink(){
  var names = getAllNames();//debugger;
  var linkName = "Link" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  
  do{
    var name1 = names[Math.floor(Math.random() * names.length)];
    var name2 = names[Math.floor(Math.random() * names.length)];

    //if (name1 == "Client1" || name2 == "Client1") {debugger;};

  }while(name1 == "Client1" || name2 == "Client1" || name1 == "System2" || name2 == "System2");

  newLinkAndActivate(name1, name2 ,linkName, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1 );

  update(root);
  updateLinks();
}

function clearAllLinks(){
  // for (var i = 0; i < linkNamesGLOBAL.length; i++) {
  //   removeLink(linkNamesGLOBAL[i]);
  // };
  // linkNamesGLOBAL=[];

for (var i = linksGLOBAL.length - 1; i >= 0; i--) {
  deleteLinkAndDeactivate(linksGLOBAL[i][3]);
};

  update(root);
  updateLinks();

}

function singleLink(){
  clearAllLinks();
  randomLink();
}

function delSpecificLink(){
  var linkForm = document.getElementById("specificLink");
  var selectedLink = linkForm.options[linkForm.selectedIndex].text;

  var deletedLink = removeLink(selectedLink);
  var linkEndNode = deletedLink[0][1];
  
  deactivateElement(treeData[0], linkEndNode.name);
  update(root);
  updateLinks();

  //removeLink(selectedLink);
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

function showAllGroups(){
  var nodes = d3.selectAll(".node")
    .filter( function(d,i){return d.hidden == true && d.type == "Group" ;} )
    .data();
      for (var i = 0; i < nodes.length; i++) {
        show(nodes[i]);
      };
  update(root);
  updateLinks();
}

function hideAllGroups(){
  var nodes = d3.selectAll(".node")
    .filter( function(d,i){return d.hidden == false && d.type == "Group" ;} )
    .data();
      for (var i = 0; i < nodes.length; i++) {
        hide(nodes[i]);
      };
  update(root);
  updateLinks();
}

// var bla = [];
// for (var i = 0; i < 1000; i++) {
//    bla.push(findElement(root,"31241")[1]); 
// };