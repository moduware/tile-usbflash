let lastStatus = null;
document.addEventListener("WebViewApiReady", (event) => {
  console.log("checkin status");
  Nexpaq.API.Module.addEventListener("DataReceived", nativeDataUpdateHandler);

  checkStatus();

  setInterval(checkStatus, 15000);

});

function checkStatus() {
	console.log("checking status");
    Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StatusCheck', []);
}

function nativeDataUpdateHandler(event) {	
    // we don't care about data not related to our module
    if(event.module_uuid != Nexpaq.Arguments[0]) return;
    
    // Checking response of our status request
    if(event.data_source == 'StatusRequestResponse') {
  
      if(event.variables.status == "connected") {
        if(lastStatus != 'connected') onConnected();
      } else if(event.variables.status == "disconnected") {
        if(lastStatus != 'disconnected') onDisconnected();
      }
  
    } // Or checking response to our connect\disconnect request 
    else if(event.data_source == 'StateChangeResponse') {
      if(event.variables.result == 'failure') {
        alert('Cannot perform the operation!');
      } else {
        console.log('success..');
        checkStatus();
      }
    }
  }

   function onConnected() {
    lastStatus = 'connected';
    this.connectState = false;
  }
  
   function onDisconnected() {
    lastStatus = 'disconnected';
    this.connectState = true;
  }