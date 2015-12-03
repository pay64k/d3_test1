/*
RabbitMQ-web-stomp is a rabbitmq plugin. So: 

browser --- (websocket/sockjs-porotocol) ---> rabbitmq with web-stomp plugin 

internally rabbitmq-web-stomp is: 

sockjs --> rabbitmq-stomp --> rabbitmq-server 
*/

 var serverAddress = 'http://10.172.27.201:15674/stomp';
 var serverAddressLocal = 'http://127.0.0.1:15674/stomp';
 var wsConnectionLocal = "ws://127.0.0.1:15674/ws";
 var wsConnection = "ws://10.172.27.201:15674/ws";


 // var ws = new SockJS('http://127.0.0.1:15674/stomp');
 //var ws = new SockJS(serverAddressLocal);
 var exampleSocket = new WebSocket(wsConnectionLocal);
 var currentServer = wsConnectionLocal;

 var client = Stomp.over(exampleSocket);
 client.debug = null;
 
//-------------------------------
var subscibeToQueue = "/queue/example_QD2"; //queue name to subcribe to in order to receive messages. client on the other side must send messages to this queue
var queueSendTo = "/queue/example_QD1";      //queue to send messages to. client on the other side must subscribe to this queue
var queue1 = "/queue/test1";
//-------------------------------

 var on_connect = function() {
    console.log('Connected to\t' + currentServer + " - OK");
    var mysubid = 'gui_sub';
    var subscription = client.subscribe(queue1, callback, { id: mysubid /*, ack: "client"*/ });
    console.log('Subscribed to\t' + queue1 + " - OK");
    console.log('Sending to\t\t' + queueSendTo + " - OK");
};
var on_error =  function(d) {
    console.log('error: ' + d.headers.message);
};

var callback = function(message) {
    // called when the client receives a STOMP message from the server
    //check if message is array of objects and call processMessage the number of times

    // console.log(message.body)
// debugger;
    if (message.body) {
      var _message = JSON.parse(message.body);
      // console.log(_message.length);
      //debugLog(">>>Received message: " + message.command)
      console.log(">>>Received message: " + message.body)
      // console.log(message);
      processMessage(_message);
      //client.ack(message.headers["message-id"],message.headers["subscription"],message.headers)
    }else{
      debugLog(">>>Received message without any body!");
    };
    //client.nack();
}
  function processMessage(message){

    switch(message.command) {
//-------------------------- DIAGRAM related cases: --------------------------
      case "NEW_OBJECT":
        // createElementAndGroupNEW(treeData[0], message.parent, message.newObject);
        // newElementTest(message.parent, message.newObject);
        newElement_op(treeData[0], message.parent, message.newObject);
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

      case "RESET":
        clearSession();
        debugLog("!------RESET------!")
        break;
//-------------------------- EVENTS related cases: --------------------------
      case "EVENTS_AMOUNT":
        console.log(message);
        break;

      case"NEW_EVENT":
        addEvent(message._event, message.visible);
        break;


      case "UPDATE":
        debugLog("updejt");
        update(root);
        updateAllLinks();
        // update_events();
        break;

      case "UPDATE_EVENTS":
        // applyFilterCombination();
        // updateEventForms();
        // updateEventView(document.getElementById('pages').options[document.getElementById('pages').selectedIndex].text);
        updateEvents();
        break;      

      case "LINK_FLOW":
        changeFlow(message.linkName, message.flow);
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
