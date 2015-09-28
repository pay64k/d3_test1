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
          console.log(">>>Not found: " + element);
          return [0, 0];
        };

        if (node.name == element)
        {
            console.log(">>>Found: " + element );
            return [1, node];
            
        }
        
        if (node.children != undefined)
        {
          for (var i=0, c=node.children.length; i<c; i++) {
              q.enqueue(node.children[i]);
          }
        }
    }
    update(root);
}

// function createElement(id){
//   return {"name": id};
// }

var properties = ["name","testObject","number","124114","other",null];
function createElement(_properties){
  if (_properties.constructor === Array && _properties.length >= 1) {   //check if the _properties is an array and if there is at least one property name
    var obj = {};
      for (var i = 0; i < _properties.length; i+=2) {
        obj[_properties[i]]=_properties[i+1];
      };
  console.log(">>>>>>Object created: " + obj[_properties[0]])
  if (_properties.length == 1) {
    console.log(">>>WARNING: Only 1 argument in properties ( " + _properties[0] + " )");
  };
  return obj;
  } else {
    console.log(">>>Create element: wrong properties!");
  };

}

function addElement(_root, id_parent, newChild){
  // if (newChild.name == undefined) {
  //   console.log(">>>>>>ERROR: Name of the object not defined! {in function addElement() }");
  //   return 0
  // };
  try{
      console.log(">>>>>>ADD " + newChild.name + " to " + id_parent);  
  var foundParent = findElement(_root,id_parent);               //Try to find parent with id_parent
  if (foundParent[0]) {                                         //Check if parent exists
    var foundChild = findElement(foundParent[1],newChild.name); //If parent exist find out if the newChild already exist
    if (foundChild[0]) {                                        //If the newChild already exist, do nothing
      console.log(">>>Already exist!");
    } else {                                                    //If the newChild doesn't exist
      console.log(">>>Adding: " + newChild.name);      
      if (foundParent[1].children == undefined) {               //Check if found parent has 'children' property assigned
        foundParent[1].children = [];                           //Add it if not
        foundParent[1].children.push(newChild);                 //Add newChild as one of the children of new parent
      } else{
        foundParent[1].children.push(newChild);
      };
      
      update(root);                                             //Update graph
    };

  } else {
    console.log(">>>Couldn't find parent!");                     //Log if parent of given id_parent doesn't exist
    };
  }
  catch(err){
    console.log(">>>>>>ERROR: Name of the object not defined! {in function addElement() }");
  }

}

function delElement(_root, id_child){  
  var found = findElement(_root, id_child);                               //Find if element exist
  console.log(">>>>>>DEL " + id_child);                                
  if (found[0]) {                                                         //Delete if yes
    console.log(">>>Delete " + id_child + " in " + found[1].parent.name);
    var elem = found[1];
    elem.parent.children.splice(elem.parent.children.indexOf(elem),1);    //Get the index of found element in its parent children array
    console.log(">>>Deleting " + elem.name);
    update(root);                                                          //Update graph
  } else {
    console.log(">>>Couldn't find " + id_child);
  };
}

function changeElement(){

}

function createTree(client_id){
  treeData.push( createElement(client_id) );
}
