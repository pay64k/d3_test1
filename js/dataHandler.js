/*------------------------------------------------------------------------
OLD VERSION of dataHandler. use functions from this to show how it was 
working before changes. grouping elemtns woked differently
------------------------------------------------------------------------*/



// a very simple queue
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

//ORIGINAL:
// function findElement(root, elementName) {

//     var q = new Queue();
//     q.enqueue(root);

//     while (true) {
//         var node = q.dequeue();

//         if (node == undefined){
//           return [0, 0];
//         };
//         if (node.name == elementName){
//             return [1, node];            
//         }
//         if (node.children != undefined){
//           for (var i=0, c=node.children.length; i<c; i++) {
//               q.enqueue(node.children[i]);
//           }
//         }
//     }
// }

//WORKING:
function findElement(root, elementName) {

    var q = new Queue();
    q.enqueue(root);

    while (true) {
        var node = q.dequeue();

        if (node == undefined){
          return [0, 0];
        };
        if (node.name == elementName){
            return [1, node];            
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

function findGrouppedElement(root, elementName) {

    var q = new Queue();
    q.enqueue(root);

    while (true){
        var node = q.dequeue();

        if (node == undefined){
          return [0, 0];
        };
        if (node.name == elementName){
            return [1, node];            
        }
        if (node.children != undefined){
          for (var i=0, c=node.grouppedChildren.length; i<c; i++) {
              q.enqueue(node.grouppedChildren[i]);
          }
        }
    }
}

//var properties = ["name","testObject","number","124114","other",null];
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

function addElement(_root, id_parent, newChild){
  try{
    debugLog(">>>ADD " + newChild.name + " to " + id_parent);  
    
    var foundParent = findElement(_root,id_parent);               //Try to find parent with id_parent
    
    if (foundParent[0]) {                                         //Check if parent exists
    
      var foundChild = findElement(foundParent[1],newChild.name); //If parent exist find out if the newChild already exist
    
      if (foundChild[0]) {                                        //If the newChild already exist, do nothing
     
        debugLog("\t>>ERROR: Already exist!");
     
      } else {                                                    //If the newChild doesn't exist
     
        debugLog("\t>>Adding: " + newChild.name);      
     
        if (foundParent[1].children == undefined) {               //Check if found parent has 'children' property assigned
     
          foundParent[1].children = [];                           //Add it if not
          foundParent[1].children.push(newChild);                 //Add newChild as one of the children of new parent
     
        } else{
     
          foundParent[1].children.push(newChild);
     
        };
         update(root); //enable if using groupElements2()
      };

    } else {
      debugLog("\t>>ERROR: Couldn't find parent!");                     //Log if parent of given id_parent doesn't exist
      };
      return newChild;
    }
  catch(err){
    debugLog("\t>>ERROR: Name of the object not defined! {in function addElement() }" + ", Message: " + err.message );
  }

}

function delElement(_root, id_child){  
  var found = findElement(_root, id_child);                                             //Find if element exist
  debugLog(">>>DEL " + id_child); 
  try{                               
    if (found[0]) {                                                                       //Delete if yes
      debugLog("\t>>Delete " + id_child + " in " + found[1].parent.name);
      var elem = found[1];
      var deleted = elem.parent.children.splice(elem.parent.children.indexOf(elem),1);    //Get the index of found element in its parent children array
      debugLog("\t>>Deleting " + elem.name);
      return deleted;                                                     
    } else {
      debugLog("\t>>ERROR: Couldn't find " + id_child );
    };
  }catch(err){}
}

function changeElement(){

}

function moveElment(childName, targetParentName){
  debugLog(">>>MOVE " + childName);
  try{
    var foundChild = findElement(treeData[0], childName);
    var foundTargetParent = findElement(treeData[0], targetParentName);
    if (foundChild[0] == 1 && foundTargetParent[0] == 1) {
        var toMove = delElementAndUngroup(treeData[0],childName);
        addElementAndGroup(treeData[0], targetParentName, toMove);
        update(root);
    }else{
      throw "One of the elments not found!";
    };

  }catch(err){
    debugLog("\t>>ERROR: in function moveElment()" + ", Message: " + err );
  }

}


//working but sorting after amount of children, not by type
function groupElements(_root, id_parent){
  try{
    var threshold = 5;
    var found = findElement(_root, id_parent);
    if (found[0]) {
      var parent = found[1];
      var amountNonGroups = 0;                                  //Amount of non groups element in the children of the parent
      var childrenNames = [];
      
        for (var i = 0; i < parent.children.length; i++) {
          if (parent.children[i].name.substring(0,5) != "Group") {
            childrenNames.push(parent.children[i].name);
          };
        };
        if (childrenNames.length > threshold) {
          var move = [];
            for (var i = 0; i < childrenNames.length; i++) {
              move.push(delElement(parent,childrenNames[i])[0]);
            };
            var newGroup = addElement(treeData[0], id_parent, createElement(["name","Group " + group_GLOBAL,"type","Group"]));
            group_GLOBAL++;
            for (var i = 0; i < childrenNames.length; i++) {
              addElement(treeData[0], newGroup.name, move[i]);
            };
        };

    };
  }
  catch(err){
    debugger;
    console.log("ERROR in groupElements(): " + err.message);
  }
}


Array.prototype.unique2 = function()
{
  var n = {},r=[];
  for(var i = 0; i < this.length; i++) 
  {
    if (!n[this[i]]) 
    {
      n[this[i]] = true; 
      r.push(this[i]); 
    }
  }
  return r;
}

//sorting by type and amount of the same type
//very low performance
function groupElements2(_root, id_parent){
  try{
    var threshold = 10;
    var found = findElement(_root, id_parent);
    if (found[0]) {
      var parent = found[1];
                                        //Amount of non groups element in the children of the parent
      var childrenNames = [];
      var childrenTypes = [];

      var nonGrouped = 0;
      for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i].type != "Group") {
          nonGrouped++;
        };
      };
      //console.log("non grouped: " + nonGrouped + " in " + parent.name);
      if (nonGrouped >= threshold) {//debugger;
        var types = [];
        for (var i = 0; i < parent.children.length; i++) {    //get array of diiferent types from all children
          if (parent.children[i].type != "Group") {
            types.push(parent.children[i].type);
          };
        };
        var filteredTypes = types.unique2();                  //filter so that only unique elements remain
        var filteredObjects = [];
        var tempObjects = [];
        var moveFlag = false;
        for (var i = 0; i < filteredTypes.length; i++) {
          //debugger;
          var typeCounter = 0;
          for (var j = parent.children.length - 1; j >= 0; j--){
            if (parent.children[j].type == filteredTypes[i]) {
              // filteredObjects.push(delElement(parent, parent.children[j].name));
              tempObjects.push(parent.children[j]);
              typeCounter++;
              if (typeCounter >= threshold) {
                //console.log("too many! " + typeCounter);
                tempObjects.forEach(function(entry){
                filteredObjects.push(delElement(parent, entry.name));
                //filteredObjects.push(parent.children.pop(entry));
                });
                moveFlag = true;
              };
           
            };
          };
          tempObjects = [];
          if (moveFlag) {
            var newGroup = addElement(_root, parent.name, createElement(["name","#" + group_GLOBAL + " "
                                                                        + filteredTypes[i],"type","Group"]));

            newGroup.children = [];
            for (var ii = 0; ii < filteredObjects.length; ii++) {
              addElement(_root, newGroup.name, filteredObjects[ii].shift());
              // newGroup.children.push(filteredObjects[ii].shift());
            };
            sortByName(newGroup);
            group_GLOBAL++;
            moveFlag = false;
            click(newGroup);    //hide groups after creation
          };
          
          filteredObjects = [];
        };
      };
    };
  }
  catch(err){
    debugLog("ERROR in groupElements(): " + err.message);
  }
}

function groupElements3(_root, id_parent, newChild){
  try{

    var parent = findElement(_root, id_parent)[1];


  }catch(err){

    //

  }
}
//very low performance:
function createElementAndGroup(_root, id_parent, child_properties, groupable){
  /*dobre do raportu jako test wydajnosci d3 engine'a:*/
  var exist = true;
  var newChild = createElement(child_properties,groupable);

  var foundParent = findElement(_root,id_parent);                 //Try to find parent with id_parent
    
    if (foundParent[0]) {                                         //Check if parent exists
      if (foundParent[1].children == undefined) {
        foundParent[1].children = [];
      };

      var foundChild = findElement(foundParent[1],newChild.name); //If parent exist find out if the newChild already exist
    
      if (foundChild[0]) {
        exist = true;
        debugLog(newChild.name + " already exist!");
      }else{
        exist = false;
      }
    }else{
      debugLog(id_parent + " parent not exist!");
    };

    if (!exist) {

      if (foundParent[1].inner_children == undefined) {
        foundParent[1].inner_children = []
      };

      if (foundParent[1].children == undefined) {
        foundParent[1].children = [];
      };

      for (var i = 0; i < foundParent[1].children.length; i++) {
        if (foundParent[1].children[i] ) {};
      };

      if (groupable) {
        foundParent[1].inner_children.push(newChild);
      }else{
        foundParent[1].children.push(newChild);
      };
     
      //newChild.parent = [];
      //newChild.parent.push(foundParent[1]);
      newChild.parent = foundParent[1];
      
    };
  
  /* tu sie konczy */

//ORIGINAL:
  // var previuoslyHidden = toggleAll();
  // addElement(_root, id_parent, createElement(child_properties));
  // groupElements2(_root,id_parent);
  // sortByName(findElement(_root,id_parent)[1]);
  // toggleSelection(previuoslyHidden);
  // update(root);
  // updateLinks();
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
        var foundGroups = findElementNEW(foundParent, "type", "Group");
        var addedFLAG = false;
        for (var i = 0; i < foundGroups.length; i++) {
          if (foundGroups[i]["GroupType"] == newChild.type) {
              foundGroups[i].inner_children.push(newChild);
              debugLog("\t>>>" + newChild.name + " added to " + foundGroups[i].name + " in " + foundParent.name );
              newChild.parent = foundGroups[i];
              addedFLAG = true;
              break;
            };
        };
        if (!addedFLAG) {
          var newGroup = createElement(["name", (newChild.type) + " Group", "type", "Group", "GroupType", newChild.type,"inner_children", [] ], false);
          foundParent.children.push(newGroup);
          newGroup.inner_children.push(newChild);
          debugLog("\t>>>" + newChild.name + " added to " + newGroup.name + " in " + foundParent.name );
          newChild.parent = newGroup;
        };        
      }else{
        if (foundParent.hidden) {                //element is not groupable so it should be visible in the visualisation
          foundParent._children.push(newChild);  //add to hidden children if parent is hidden
        }else{
          foundParent.children.push(newChild); 
        };
        debugLog("\t>>>" + newChild.name + " added to " + foundParent.name );
      };

    }
  }

function createElementAndGroup2(_root, id_parent, child_properties){
  var newChild = addElement(_root, id_parent, createElement(child_properties));
  groupElements3(_root, newChild.parent.name);
  update(root);

}

//used for moving the object only, the only difference to the upper function is that it 
//doesn't create new object but takes an already existing object.
function addElementAndGroup(_root, id_parent, child){
  var previuoslyHidden = toggleAll();
  addElement(_root, id_parent, child);
  groupElements2(_root,id_parent);
  sortByName(findElement(_root,id_parent)[1]);
  toggleSelection(previuoslyHidden);
  update(root);
  updateLinks();
}

function delElementAndUngroup(_root, element){
  var previuoslyHidden = toggleAll();
  var threshold = 2;
  try{
    var deleted = delElement(_root,element)[0];
    //console.log("Deleted " + deleted.name);
    var parent = deleted.parent;
    if (deleted.parent.type == "Group") {
      //console.log("was in a group: " + parent.name);
      if (parent.children.length <= threshold) {
        //debugger;
        // parent.children.forEach(function(entry) {
        //    addElement(_root, parent.parent.name, delElement(_root, entry.name)[0]);
        // });
        for (var i = parent.children.length - 1; i >= 0; i--) {
          addElement(_root, parent.parent.name, delElement(_root, parent.children[i].name)[0]);
        };
        delElement(_root,parent.name);
        group_GLOBAL--;
      };
    };
    sortByName(parent.parent);
    toggleSelection(previuoslyHidden);
    update(root);
    updateLinks();
    return deleted;
  }catch(err){
    toggleSelection(previuoslyHidden);  //for cosmetic reason in case of element was not found, then after trying to add toggleSelection(previuoslyHidden) was not executed and on next add everything was shown and caused a mess
  }
}

function sortByName(parent){
  parent.children.sort(function (a, b) {
  if (a.name> b.name) {
    return 1;
  }
  if (a.name< b.name) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
}



//not used now:
function createTree(client_id){
  treeData.push( createElement(client_id) );
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