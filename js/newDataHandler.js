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
          //return found;
          return [];
        };

        if (node[propertyName] == property){
            //found.push(node);
            return [node];            
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

function findElementNEW_op(root, propertyName, property) {

    var q = new Queue();
    q.enqueue(root);
    var found = [];

    while (true) {
        var node = q.dequeue();

        if (node == undefined){
          //return found;
          return [0, 0];
        };

        if (node[propertyName] == property){
            //found.push(node);
            return [1, node];            
        }
        if (node.children != undefined){
          for (var i=0, c=node.children.length; i<c; i++) {
              q.enqueue(node.children[i]);
          }
        }
        // if (node.inner_children !=undefined){
        //   for (var i=0, c=node.inner_children.length; i<c; i++) {
        //       q.enqueue(node.inner_children[i]);
        //   }
        // }
        if (node._children != undefined){
           for (var i=0, c=node._children.length; i<c; i++) {
          q.enqueue(node._children[i]);
        }
        }
    }
}


function createElementAndGroupNEW(_root, id_parent, element){
  /*dobre do raportu jako test wydajnosci d3 engine'a:*/
  var exist = true;
  //add additional properties:
  element.hidden = false;
  element.children = [];
  element.linkedTo = [];
  element.activated = false;
 
  var foundElementsList = findElementNEW(_root, "name", id_parent);       //Try to find parent with id_parent
   
    if (foundElementsList.length != 0) {     
      var foundParent =  foundElementsList[0];                                       
      if (foundParent.children == undefined) {
        foundParent.children = [];
      };

      var foundChild = findElementNEW(_root, "name", element.name); //If parent exist find out if the newChild already exist
    
      if (foundChild.length >= 1) {
        exist = true;
        debugLog(element.name + " already exist!");
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

      if (element.groupable) {
        foundParent.inner_children.push(element);
        element.parent = foundParent;
        element.activated = false;        
      }else{
        if (foundParent.hidden) {                //element is not groupable so it should be visible in the visualisation
          foundParent._children.push(element);  //add to hidden children if parent is hidden
        }else{
          foundParent.children.push(element); 
        };
      };
      debugLog("\t>>>" + element.name + " added to " + foundParent.name );
    }
  }

function newElementTest(id_parent, element){

  var result = treeData.filter(function( obj ) {
    return obj.name == id_parent;
  });

  result[0].inner_children.push(element);

}

function newElement_op(_root, id_parent, element) {


  var temp = findElementNEW_op(_root, "name", id_parent); //Try to find parent with id_parent
  var check = temp[0];
  var foundParent = temp[1];
  if (!check) {
    debugLog(id_parent + " parent not exist!");
  } else {
    if (element.groupable) {
      foundParent.inner_children.push(element);
      element.parent = foundParent;
    } else {
      if (foundParent.hidden) {               //element is not groupable so it should be visible in the visualisation
        foundParent._children.push(element);  //add to hidden children if parent is hidden
      } else {
        if (foundParent.children == undefined) {
          foundParent.children = [];
        };
        foundParent.children.push(element);
      };
    };
      debugLog("\t>>>" + element.name + " added to " + foundParent.name);
      //add additional properties:
      element.hidden = false;
      element.children = [];
      element.linkedTo = [];
      element.activated = false;
      element.inner_children = [];
  };
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
      if (found.activated) {
        var deleted = found.parent.children.splice(found.parent.children.indexOf(found),1)[0];
      }else{
        var deleted = found.parent.inner_children.splice(found.parent.inner_children.indexOf(found),1)[0];
      };
      
    }else{
      if (parent.hidden) {
        var deleted = found.parent._children.splice(found.parent._children.indexOf(found),1)[0];
      }else{
        var deleted = found.parent.children.splice(found.parent.children.indexOf(found),1)[0];
      };
    };
    //delete all links assocaiated with node:
    if (deleted.linkedTo.length > 0) {
      for (var i = 0; i < deleted.linkedTo.length; i++) {
        deleteLink(deleted.linkedTo[i][1]);
      };
    };
    debugLog("\t>>Deleted " + found.name);
    return deleted;
  };
}

function moveElement(childName,targetParentName){
  //determine if both elements exist
  var foundChild = findElementNEW(treeData[0], "name", childName)[0];
  if (foundChild != undefined) {
    var foundTargetParent = findElementNEW(treeData[0], "name", targetParentName)[0];
    if (foundTargetParent != undefined) {
      //extract element from parent depending on properties of element and parent:
      if (foundChild.groupable) {
        if (foundChild.activated) {
          var move = foundChild.parent.children.splice(foundChild.parent.children.indexOf(foundChild),1)[0];
        }else{
          var move = foundChild.parent.inner_children.splice(foundChild.parent.inner_children.indexOf(foundChild),1)[0];
        };
      
      }else{
       if (foundChild.parent.hidden) {
          var move = foundChild.parent._children.splice(foundChild.parent._children.indexOf(foundChild),1)[0];
       }else{
         var move = foundChild.parent.children.splice(foundChild.parent.children.indexOf(foundChild),1)[0];
       };
    };
    //add element to found parent depending on properites:
      if (move.groupable) {
        if (move.activated) {
          createProperty(foundTargetParent,"children");
          move.parent = foundTargetParent;
          foundTargetParent.children.push(move);
        }else{
          createProperty(foundTargetParent,"inner_children");
          move.parent = foundTargetParent;
          foundTargetParent.inner_children.push(move);
        };
      
      }else{
       if (foundTargetParent.hidden) {
          createProperty(foundTargetParent,"children");
          foundTargetParent.children.push(move);
       }else{
          createProperty(foundTargetParent,"_children");
          move.parent = foundTargetParent;
          foundTargetParent._children.push(move);
       };
    };

    }else{
      debugLog(">>>Couldn't find target parent name: " + targetParentName + " in moveElement()");
    };
  }else{
    debugLog(">>>Couldn't find element name: " + childName + " in moveElement()");
  };

}

function createProperty(node, propertyName){
  if (node[propertyName] == undefined) {
    node[propertyName] = [];
  };
}

function clearSession(){
  treeData = [{
    "name": "Client1",
    "parent": "null",
    "type": "Client",
    "children": [],
    "inner_children": []
  }];
  events_data = [];
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

  console.log("LOG>>>>\t" + message);

}
