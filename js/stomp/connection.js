 //var ws = new SockJS('http://127.0.0.1:15674/stomp');
 var ws = new SockJS('http://10.172.27.201:15674/stomp');

 var client = Stomp.over(ws);
 
//-------------------------------
var subscibeToQueue = "/queue/example_QD2"; //queue name to subcribe to in order to receive messages. client on the other side must send messages to this queue
var queueSendTo = "/queue/example_QD1";      //queue to send messages to. client on the other side must subscribe to this queue
var queue1 = "/queue/test1";
//-------------------------------

 var on_connect = function() {
    console.log('connected');
    var mysubid = 'SubscriptionID_consumer1';
    var subscription = client.subscribe(queue1, callback, { id: mysubid });
    console.log('subscribed to ' + mysubid);
};
var on_error =  function() {
    console.log('error');
};

var callback = function(message) {
    // called when the client receives a STOMP message from the server
    //check if message is array of objects and call processMessage the number of times

    //console.log("Got message with body " + message.body)

    if (message.body) {
      var message = JSON.parse(message.body);

      //debugLog(">>>Received message: " + message.command)

      processMessage(message);
    
    }else{
      debugLog(">>>Received message without any body!");
    };
}
  function processMessage(message){

    switch(message.command) {
//-------------------------- DIAGRAM related cases: --------------------------
      case "NEW_OBJECT":
        //createElementAndGroupNEW(treeData[0], message.parent, message.newObject);
        newElementTest(message.parent, message.newObject);
        break;

      case "DELETE":
        deleteElement(treeData[0], message.name);
        break;

      case "MOVE":
        moveElement(message.name, message.targetParent);
        break

      case "ADD_LINK":
        newLink(message.fromName,message.toName, message.linkName, message.linkColorIndex, message.visible);
        break;

      case "DEL_LINK":
        deleteLink(message.linkName);
        break;
//-------------------------- EVENTS related cases: --------------------------
      case "EVENTS_AMOUNT":
        console.log(message);
        break;

      case"EVENTS_BATCH":
        addEvent(message._event, message.visible);
        break;


      case "UPDATE":
        console.log("updejt");
        update(root);
        updateAllLinks();
        // update_events();
        break;

      case "UPDATE_EVENTS":
        applyFilterCombination();
        updateEventForms();
        break;      


      default:
        debugLog("Received unknown command: " + message.command);
        break; 
    }

  }

// client.connect('test_user1', 'test', on_connect, on_error, '/');
client.connect('gui', 'test', on_connect, on_error, '/');
client.heartbeat.outgoing = 0;
client.heartbeat.incoming = 0;

// function myFunction() {
//     client.send("/queue/example_QD1", {priority: 9}, "From USER 1");
// }
