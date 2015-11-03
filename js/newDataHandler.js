function Queue() {
    var queue = [];
    
    this.enqueue = function(x) {
        queue.push(x);
    };
    this.dequeue = function() {
        return queue.shift();
    };
    this.length = function() {
        return queue.length;
    };
    this.queue = function() {
      return queue;
    };
}

function findElementNEW(root, propertyName, property) {

    var q = new Queue();
    q.enqueue(root);
    var found = [];

    while (true) {
        var node = q.dequeue();

        if (node == undefined){
          return found;
          //return [0, 0];
        };

        if (node[propertyName] == property){
            found.push(node);
            //return [1, node];            
        }
        if (node.children != undefined){
          for (var i=0, c=node.children.length; i<c; i++) {
              q.enqueue(node.children[i]);
          }
        }
        if (node.inner_children !=undefined){
          for (var i=0, c=node.inner_children.length; i<c; i++) {
              q.enqueue(node.inner_children[i]);
          }
        }
        if (node._children != undefined){
           for (var i=0, c=node._children.length; i<c; i++) {
          q.enqueue(node._children[i]);
        }
        }
    }
}

function createElement(_properties, groupable){
  if (_properties.constructor === Array && _properties.length >= 1) {   //check if the _properties is an array and if there is at least one property name
    var obj = {};
      for (var i = 0; i < _properties.length; i+=2) {
        obj[_properties[i]]=_properties[i+1];
      };
  debugLog(">>>Temporary object created: " + obj[_properties[0]])
  if (_properties.length == 1) {
    debugLog("\t>>WARNING: Only 1 argument in properties ( " + _properties[0] + " )");
  };
  obj.hidden = false; //set as default after creation
  obj.children = [];
  obj.linkedTo = [];

  if (groupable) {
    obj.groupable = true;
  }else{
    obj.groupable = false;
  };

  return obj;
  } else {
    debugLog("\t>>Create element: wrong properties!");
  };

}

function createElementAndGroupNEW(_root, id_parent, child_properties, groupable){
  /*dobre do raportu jako test wydajnosci d3 engine'a:*/
  var exist = true;
  var newChild = createElement(child_properties,groupable);
  var foundElementsList = findElementNEW(_root, "name", id_parent);       //Try to find parent with id_parent
                                                             
    
    if (foundElementsList.length != 0) {     
      var foundParent =  foundElementsList[0];                                       
      if (foundParent.children == undefined) {
        foundParent.children = [];
      };

      var foundChild = findElementNEW(_root, "name", newChild.name); //If parent exist find out if the newChild already exist
    
      if (foundChild.length >= 1) {
        exist = true;
        debugLog(newChild.name + " already exist!");
      }else{
        exist = false;
      }
    }else{
      debugLog(id_parent + " parent not exist!");
    };

    if (!exist) {

      if (foundParent.inner_children == undefined) {
        foundParent.inner_children = []
      };

      if (foundParent.children == undefined) {
        foundParent.children = [];
      };

      if (groupable) {
        // var foundGroups = findElementNEW(foundParent, "type", "Group");
        // var addedFLAG = false;
        // for (var i = 0; i < foundGroups.length; i++) {
        //   if (foundGroups[i]["GroupType"] == newChild.type) {
        //       foundGroups[i].inner_children.push(newChild);
        //       debugLog("\t>>>" + newChild.name + " added to " + foundGroups[i].name + " in " + foundParent.name );
        //       newChild.parent = foundGroups[i];
        //       addedFLAG = true;
        //       break;
        //     };
        // };
        // if (!addedFLAG) {
        //   var newGroup = createElement(["name", (newChild.type) + " Group", "type", "Group", "GroupType", newChild.type,"inner_children", [] ], false);
        //   foundParent.children.push(newGroup);
        //   newGroup.inner_children.push(newChild);
        //   debugLog("\t>>>" + newChild.name + " added to " + newGroup.name + " in " + foundParent.name );
        //   newChild.parent = newGroup;
        // };
        foundParent.inner_children.push(newChild);
        newChild.parent = foundParent;
        newChild.activated = false;        
      }else{
        if (foundParent.hidden) {                //element is not groupable so it should be visible in the visualisation
          foundParent._children.push(newChild);  //add to hidden children if parent is hidden
        }else{
          foundParent.children.push(newChild); 
        };
      };
      debugLog("\t>>>" + newChild.name + " added to " + foundParent.name );
    }
  }

function deleteElement(_root, childName){
  debugLog(">>>DEL " + childName); 
  var foundList = findElementNEW(_root, "name", childName);
  if (foundList.length == 0) {
    debugLog("\t>>ERROR: Couldn't find " + childName );
  }else{
    var found = foundList[0];
    var parent = found.parent;

    if (found.groupable) {
      var deleted = found.parent.inner_children.splice(found.parent.inner_children.indexOf(found),1);
    }else{
      if (parent.hidden) {
        var deleted = found.parent._children.splice(found.parent._children.indexOf(found),1);
      }else{
        var deleted = found.parent.children.splice(found.parent.children.indexOf(found),1);
      };
    };

    debugLog("\t>>Deleted " + found.name);
    return deleted;
  };
}

function moveElement(childName,targetParentName){
  var foundChild = findElementNEW(treeData[0], "name", childName)[0];
  var foundTargetParent = findElementNEW(treeData[0], "name", targetParentName)[0];

  if (foundChild != undefined && foundTargetParent != undefined) {

    if (foundChild.parent.type == "Group") {                     
      var move = foundChild.parent.inner_children.splice(foundChild.parent.inner_children.indexOf(foundChild),1);
    }else{
      if (foundChild.parent.hidden) {
        var move = foundChild.parent._children.splice(foundChild.parent._children.indexOf(foundChild),1);    
      }else{
        var move = foundChild.parent.children.splice(foundChild.parent.children.indexOf(foundChild),1);
      };
    };

    if (foundTargetParent.type == "Group") {  
        move[0].groupable = true;  
        move[0].parent = foundTargetParent;                 
        foundTargetParent.inner_children.push(move[0]);
    }else{
      if (foundTargetParent.hidden) {
        foundTargetParent._children.push(move[0]); 
        move[0].groupable = false;   
      }else{
        if (foundTargetParent.children == undefined) {
          foundTargetParent.children = [];
          }
        foundTargetParent.children.push(move[0]);
        move[0].groupable = false; 
        
      };
    };

  }else{
    debugLog("\t>>>ERROR: Couln't find one of the elements in moveElement()");
  };

}

function activateElement(_root, childName){
  var foundList = findElementNEW(_root, "name", childName);
  if (foundList.length != 0) {
    var found = foundList[0];
    var parent = found.parent;
    if (!found.activated && parent != "null") {    //for focusing view on client node, since it has no parents                 
      var move = found.parent.inner_children.splice(found.parent.inner_children.indexOf(found),1)[0];
      if (parent.children == undefined) {
        parent.children = [];
      };
      if (move != undefined) {
        move.activated = true;
        parent.children.push(move);
      };
      
    };
  }else{
    debugLog("\t>>> Element not found: " + childName);
  };
}

function deactivateElement(_root, childName){
  var foundList = findElementNEW(_root, "name", childName);
  if (foundList.length != 0) {
    var found = foundList[0];
    var parent = found.parent;
    if (found.activated) {                     
      var move = found.parent.children.splice(found.parent.children.indexOf(found),1)[0];
      if (parent.children == undefined) {
        parent.children = [];
      };
      if (move != undefined) {
        move.activated = false;
        parent.inner_children.push(move);
      };
      
    };
  }else{
    debugLog("\t>>> Element not found: " + childName + " in deactivateElement()");
  };
}

function newLinkAndActivate(startNodeName,endNodeName, linkName, linkColorIndex){

  activateElement(treeData[0],startNodeName);
  activateElement(treeData[0],endNodeName);
  var link = addLink(startNodeName, endNodeName, linkName, linkColorIndex);
  linksGLOBAL.push(link);

}

function deleteLinkAndDeactivate(linkID){

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
  
  
  // update(root);
  // updateLinks();
}

function addMultipleLinks(startNodeName, endNodeNames){
  //var endNodeNames = ["Radio9", "Radio10", "Radio11", "Radio12", "Radio14"];
  //endNodeNames = group;
  activateElement(treeData[0],startNodeName);
  for (var i = 0; i < endNodeNames.length; i++) {
    activateElement(treeData[0],endNodeNames[i]);
    var link = addLink(startNodeName, endNodeNames[i], ("Link" + i) , i, 0);
    linksGLOBAL.push(link);
  };
}

function debugLog(body){

var currentdate = new Date(); 
var message =    currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "@"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "."
                + currentdate.getMilliseconds()  
                + "\t " + body;

// console.log('%c' + message, 'color: red');
console.log(message);
// //console.log(body);
}

// for (var i = 0; i < linksGLOBAL.length; i++) {
//   if (linksGLOBAL[i][3]=="Link72501") {
//     console.log(linksGLOBAL[i]);
//   };
// };