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


function findElement(root, element) {

    var q = new Queue();
    q.enqueue(root);

    while (true) {
        var node = q.dequeue();

        if (node == undefined){
          //console.log(">>>Not found: " + element);
          return [0, 0];
        };

        if (node.name == element)
        {
            //console.log(">>>Found: " + element );
            return [1, node];
            
        }
        
        if (node.children != undefined)
        {
          for (var i=0, c=node.children.length; i<c; i++) {
              q.enqueue(node.children[i]);
          }
        }
    }
    //update(root);
}

//var properties = ["name","testObject","number","124114","other",null];
function createElement(_properties){
  if (_properties.constructor === Array && _properties.length >= 1) {   //check if the _properties is an array and if there is at least one property name
    var obj = {};
      for (var i = 0; i < _properties.length; i+=2) {
        obj[_properties[i]]=_properties[i+1];
      };
  debugLog(">>>Object created: " + obj[_properties[0]])
  if (_properties.length == 1) {
    debugLog("\t>>WARNING: Only 1 argument in properties ( " + _properties[0] + " )");
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
         update(root);
        // groupElements(newChild); 
        // update(root);                                            //Update graph
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
  if (found[0]) {                                                                       //Delete if yes
    debugLog("\t>>Delete " + id_child + " in " + found[1].parent.name);
    var elem = found[1];
    var deleted = elem.parent.children.splice(elem.parent.children.indexOf(elem),1);    //Get the index of found element in its parent children array
    debugLog("\t>>Deleting " + elem.name);
    // update(root);                                                                       //Update graph
    return deleted;                                                     
  } else {
    debugLog("\t>>ERROR: Couldn't find " + id_child );
  };
}

function changeElement(){

}



var group_GLOBAL=0;
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
            var newGroup = addElement(treeData[0], id_parent, createElement(["name","Group " + group_GLOBAL]));
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
      if (nonGrouped >= threshold) {
        var types = [];
        for (var i = 0; i < parent.children.length; i++) {    //get array of types from all children
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
                });
                moveFlag = true;
              };
           
            };
          };
          tempObjects = [];
          if (moveFlag) {
            var newGroup = addElement(_root, parent.name, createElement(["name","#" + group_GLOBAL + " "
                                                                        + filteredTypes[i],"type","Group"]));
            for (var ii = 0; ii < filteredObjects.length; ii++) {
              addElement(_root, newGroup.name, filteredObjects[ii].shift());
            };
            sortByName(newGroup);
            group_GLOBAL++;
            moveFlag = false;
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

function addElementAndGroup(_root, id_parent, child_properties){
  addElement(_root, id_parent, createElement(child_properties));
  groupElements2(_root,id_parent);
  sortByName(findElement(_root,id_parent)[1]);
  update(root);
}

function delElementAndUngroup(_root, element){
  var threshold = 2;
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
  update(root);
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
//console.log(message);
}