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
        // update(root);
        // groupElements(newChild); 
        update(root);                                            //Update graph
      };

    } else {
      debugLog("\t>>ERROR: Couldn't find parent!");                     //Log if parent of given id_parent doesn't exist
      };
      return newChild;
    }
  catch(err){
    debugLog("\t>>ERROR: Name of the object not defined! {in function addElement() }");
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
    update(root);                                                                       //Update graph
    return deleted;                                                     
  } else {
    debugLog("\t>>ERROR: Couldn't find " + id_child);
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
    console.log("ERROR in groupElements()");
  }
}

//sorting by type and amount of the same type
function groupElements2(_root, id_parent){
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
    debugLog("ERROR in groupElements()");
  }
}

function addElementAndGroup(_root, id_parent, child_properties){
  addElement(_root, id_parent, createElement(child_properties));
  groupElements2(_root,id_parent);
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

console.log(message);
}