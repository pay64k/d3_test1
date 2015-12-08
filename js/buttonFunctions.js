var addedRadiosNamesType1 = [];
var addedRadiosNamesType2 = [];

function testClick1(){

  var randomName =  "R" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  createElementAndGroupNEW(treeData[0],"TG1-1",{name: randomName, type: "Radio", property1: "test", groupable: true});
  addedRadiosNamesType1.push(name);
  //update(root);
}
function testClick2(){

  var randomName =  "R" + Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  createElementAndGroupNEW(treeData[0],"TG1-2",{name: randomName, type: "RadioTYPE2", property1: "test", groupable: true});
  addedRadiosNamesType1.push(name);
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
       zoom.translate([500, offsetY]);
       zoom.scale(1);
       _svg.transition()
           .duration(750)
           .attr("transform", "translate(" + 500 + "," + offsetY + " )scale(1)" + "rotate(90)");

}

function focusView(){


// var t = d3.transform(d3.select("svg").select("g").attr("transform")),
//     x0 = t.translate[0],
//     y0 = t.translate[1];

//console.log("View: x: "+ x0 + ", y: " + y0);

var focusForm = document.getElementById("focusForm");
var nodeName = focusForm.options[focusForm.selectedIndex].text;
var node = findElementNEW(treeData[0], "name", nodeName)[0];


 //if (node.parent.hidden) {
  unhideParents(node);
  var nodeOriginalActivation = node.activated;
  setActivation(node,true);
  update(root);
 //};

//console.log("Node: x: " + x + ", y: " + y);
 var x = node.y;
 var y = node.x;
var newY = offsetY - x;
var newX = offsetX - y;

//console.log("Diff: x: " + diffX + ", y:" + diffY);
//console.log("-----------------");

 var _svg = d3.select("svg").select("g");
       zoom.translate([newX, newY]);
       zoom.scale(1);
       _svg.transition()
           //.delay(300)
           .duration(650)
           .attr("transform", "translate(" + (newX) + "," + (newY) + " )scale(1)rotate(90)");
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
            setActivation(node,nodeOriginalActivation);
            });
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

function populatePagingForm(pageAmount){
// debugger;
  var select = document.getElementById("pages");
  var tempValue = select.value;
  
  if (tempValue=="") {
    tempValue=0;
  };

  if (select != null) {
    select.options.length = 0;  //reset for no repeats
      for(var i = 0; i < pageAmount; i++) {
       select.options[select.options.length] = new Option(i, i);
      };

  };
  if (tempValue<=pageAmount-1) {
    select.value = tempValue;
    select.text = tempValue;
  }else{
    select.value = 0;
    select.text = 0;
  };

}

function changePage(direction){
  var pageForm = document.getElementById("pages");
  var amount = pageForm.options["length"];
  var currentPage = pageForm.options[pageForm.selectedIndex].value;

switch(direction){
  case "next":
    if (currentPage>=amount-1) {
      currentPage = amount-1;
    }
    else{
      currentPage++;
    };
  break;

  case "prev":
    if (currentPage<=0) {
      currentPage = 0;
    }
    else{
      currentPage--;
    };
  break;
}

pageForm.options[pageForm.selectedIndex].value = currentPage;
pageForm.options[pageForm.selectedIndex].text = currentPage;
updateEvents();

}

function populateEventForm(formID){
var values = 0 ;

  switch(formID){
    case "eventType":
      values = getUniqueEventTypes();
      break;

    case "testSession":
      values = getUniqueEventSessions();
      break;

    case "node1":
      values = getUniqueEventNode1();
      break;

    case "node2":
      values = getUniqueEventNode2();
      break;

    case "eventSuccess":
      values = [true, false];
      break;

    default:
      break;

  }

  var select = document.getElementById(formID);

  var tempValue = document.getElementById(formID).value;

  if (tempValue=="") {
    tempValue="showAll";
  };

  if (select != null) {
    select.options.length = 0;  //reset for no repeats
     select.options[select.options.length] = new Option("All", "showAll");
      for(var i = 0; i < values.length; i++) {
       select.options[select.options.length] = new Option(values[i], values[i]);
      };

  };
  select.value = tempValue;
}

function updateEventForms(){
  populateEventForm("eventType");
  populateEventForm("testSession");
  populateEventForm("node1");
  populateEventForm("node2");
  populateEventForm("eventSuccess");
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

  newLink(selectedFrom, selectedTo, linkName, randomColor, true);
  update(root);
  updateAllLinks();
}

function randomLink(){
  var names = getAllNames();//debugger;
  var linkName = "Link" + Math.floor(Math.random() * (10000000 - 1 + 1)) + 1;
  
  do{
    var name1 = names[Math.floor(Math.random() * names.length)];
    var name2 = names[Math.floor(Math.random() * names.length)];

  }while(name1 == "Client1" || name2 == "Client1" || name1 == "System2" || name2 == "System2");

  newLink(name1, name2 ,linkName, Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1 );

  update(root);
  updateAllLinks();
}

function clearAllLinks(){
  for (var i = linksData.length - 1; i >= 0; i--) {
    deleteLink(linksData[i][0]);
  };
  update(root);
  updateAllLinks();
}

function singleLink(){
  clearAllLinks();
  randomLink();
  update(root);
  updateAllLinks();

}

function delSpecificLink(){
  var linkForm = document.getElementById("specificLink");
  var selectedLink = linkForm.options[linkForm.selectedIndex].text;

  deleteLink(selectedLink);
  update(root);
  updateAllLinks();
}

function updateLinkForm(){
  var linkNames = [];
  for (var i = 0; i < linksData.length; i++) {
    linkNames.push(linksData[i][0]);
  };

var select = document.getElementById("specificLink");
  if (select != null) {
    select.options.length = 0;  //reset for no repeats
      for(var i = 0; i < linkNames.length; i++) {
       select.options[select.options.length] = new Option(linkNames[i], i);
      };
  };

var linksDIV = document.getElementById("listDIV");

var selectStrStart = "<select id='linksList' multiple='multiple'>";
var optionsStr = "";
var selectStrEnd = "</select>";

for (var i = 0; i < linkNames.length; i++) {
  optionsStr = optionsStr.concat("<option>" + linkNames[i] + "</option>");
};

var finalStr = selectStrStart + optionsStr + selectStrEnd;


// var str = "<select id='linksList' multiple='multiple'><option>Value 1</option><option>Value 2</option><option>Value 3asdasd</option></select>";
linksDIV.innerHTML = finalStr;
$('#linksList').toChecklist({showCheckboxes : true, addSearchBox : true, animateSearch : false});

}



function buttonChangeFlow(){
    var linkForm = document.getElementById("specificLink");
    var selectedLink = linkForm.options[linkForm.selectedIndex].text;

    var radioButtons = document.getElementsByName("optradio");

    for (var i = 0, length = radioButtons.length; i < length; i++) {
    if (radioButtons[i].checked) {
        // do whatever you want with the checked radio
        changeFlow(selectedLink,radioButtons[i].value);
        // only one radio can be logically checked, don't check the rest
        break;
    }
}
}

function buttonLinksFilter(){
  var checkboxes = document.getElementsByName('linksList[]');
  for (var i = 0; i < checkboxes.length; i++) {
      var linkID = checkboxes[i].value;
      var link = d3.select("#G"+linkID);

      for (var i = 0; i < linksData.length; i++) {
        if (linksData[i][0] == linkID) {
          var node1 = linksData[i][1];
          var node2 = linksData[i][2];
          break;
        };
      };

    if (checkboxes[i].checked) {
      //set link to visible
      link.attr("opacity", 1);
      //show linked nodes
      //debugger;
      setActivation(node1,true);
      setActivation(node2,true);

    }else{
      //set link to invisible
      link.attr("opacity", 0);
      //hide linked nodes
      setActivation(node1,false);
      setActivation(node2,false);
    };
    
  };
  update(root);
  updateAllLinks();
}

function buttonLinksFilterCheckAll(){
  $('#linksList').toChecklist('checkAll');
}

function buttonLinksFilterUncheckAll(){
  $('#linksList').toChecklist('clearAll');
}

function buttonLinksFilterInvertSelection(){
  $('#linksList').toChecklist('invert');
}

function buttonUpdate(){
  update(root);
  updateAllLinks();
  debugLog(">>>UPDATE BUTTON");
}