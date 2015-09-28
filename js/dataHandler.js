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
          console.log(">>Not found: " + element);
          return [0, 0];
        };

        if (node.name == element)
        {
            console.log(">>Found: " + element );
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

function createElement(id){
  return {"name": id};
}

function addElement(_root, id_parent, newChild){
  console.log(">Adding " + newChild.name + " to " + id_parent);  
  var foundParent = findElement(_root,id_parent);               //Try to find parent with id_parent
  if (foundParent[0]) {                                         //Check if parent exists
    var foundChild = findElement(foundParent[1],newChild.name); //If parent exist find out if the newChild already exist
    if (foundChild[0]) {                                        //If the newChild already exist, do nothing
      console.log(">>Already exist!");
    } else {                                                    //If the newChild doesn't exist
      console.log(">>Adding: " + newChild.name);      
      if (foundParent[1].children == undefined) {               //Check if found parent has 'children' property assigned
        foundParent[1].children = [];                           //Add it if not
        foundParent[1].children.push(newChild);                 //Add newChild as one of the children of new parent
      } else{
        foundParent[1].children.push(newChild);
      };
      
      update(root);                                             //Update graph
    };


  } else {
    console.log(">>Couldn't find parent!");                     //Log if parent of given id_parent doesn't exist
   
  };

}
