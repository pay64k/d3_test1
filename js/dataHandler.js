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

function handler(cmd, root, element, newElement, property, newValue) {
    //debugger;
    var q = new Queue();
    q.enqueue(root);

    while (true) {
        var node = q.dequeue();

        if (node == undefined)
          break;

        if (node.name == element)
        {
            if (cmd == "add") {
              console.log("Add " + newElement.name + " to " + node.parent.name);
              node.parent.children.push(newElement);

              break;
              }else if (cmd == "del") {
                console.log("Delete " + element + " from " + node.parent.name);

                break;
                }else if (cmd == "change") {
                  console.log("change element");

                  break;
                  }else{
                    console.log("Wrong command!");
                    break;

                  };
            //return [node.parent.children.indexOf(node), node.parent];
        }
        // add all the children to the back of the queue
        if (node.children != undefined)
        {
          for (var i=0, c=node.children.length; i<c; i++) {
              q.enqueue(node.children[i]);
          }
        }
    }
    update(root);
}
