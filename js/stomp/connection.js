 var ws = new SockJS('http://127.0.0.1:15674/stomp');

 var client = Stomp.over(ws);

 var on_connect = function() {
    console.log('connected');
    var mysubid = 'SubscriptionID_consumer1';
    var subscription = client.subscribe("/queue/example_QD2", callback, { id: mysubid });
    console.log('subscribed to ' + mysubid);
};
var on_error =  function() {
    console.log('error');
};

var callback = function(message) {
    // called when the client receives a STOMP message from the server
    if (message.body) {

      var messageBody = message.body;

      console.log("got message with body " + message.body)

      if (messageBody == "Message1") {
        update(root);
        updateLinks();
      };

      if (messageBody == "Message2") {
        randomLink();
      }

      if (messageBody.indexOf("CMD:NEW_OBJECT") > -1 ) {
        var objStrEndIndex = messageBody.indexOf("];");
        var objStr = messageBody.substring(20, objStrEndIndex );
        console.log(objStr);
        var objProperties = objStr.split(",");
        console.log(objProperties);
        // createElement(objProperties,false);
        createElementAndGroupNEW(treeData[0],"BTS2-1",objProperties, false)
      };

      //divAppend('#first',message.body);
      //debugClient(client);
      // if (message.body=="New radio") {
      //   newRadio(1);
      // };
      // updateBar();
      // toggleLight();

  } else {
      console.log("got empty message");
      
  }


};

client.connect('test_user1', 'test', on_connect, on_error, '/');
client.heartbeat.outgoing = 0;
client.heartbeat.incoming = 0;

function myFunction() {
    client.send("/queue/example_QD1", {priority: 9}, "From USER 1");
}

// function divAppend(divID, text){
//     var div  = $(divID + ' div');
//     div.append(text);
//     div.append('<br/>');
//     $(divID).scrollTop($(divID)[0].scrollHeight);

// }

// function debugClient(client){
//     client.debug = function(str) {
//         // append the debug log to a #debug div somewhere in the page using JQuery:
//         var date = new Date();
//         var hours = date.getHours();
//         var minutes = date.getMinutes();
//         var seconds = date.getSeconds();
//         var miliseconds = date.getMilliseconds();
//         $("#debug").append(hours + ":" + minutes + ":" + seconds + ":" + miliseconds + " ");
//         $("#debug").append(str);
//         $("#debug").append("<br/>");
//         $("#debug").scrollTop($("#debug")[0].scrollHeight);
//     };
// }
