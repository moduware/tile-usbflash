
var lastStatus = null;

function checkStatus() {
	console.log("checking status");
    Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StatusCheck', []);
}

function Connect() {
	console.log("connecting..");
	Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Connect', [1]);
	document.getElementById('button-connect').textContent = "Connecting...";
}

function Disconnect() {
	console.log("Disconnecting..");
	Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Disconnect', [1]);
	document.getElementById('button-disconnect').textContent = "Disconnecting...";
}

/** ================ Handlers == */
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

	document.getElementById('button-connect').textContent = "Connect";

	document.getElementById('button-connect').classList.add('hidden');
	document.getElementById('svg-disconnected').classList.add('hidden');

	document.getElementById('svg-connected').classList.remove('hidden');
	document.getElementById('button-disconnect').classList.remove('hidden');
	//document.getElementById('button-file-manager').classList.remove('hidden');
}

function onDisconnected() {
	lastStatus = 'disconnected';

	document.getElementById('button-disconnect').textContent = "Disconnect";

	//document.getElementById('button-file-manager').classList.add('hidden');
	document.getElementById('button-disconnect').classList.add('hidden');
	document.getElementById('svg-connected').classList.add('hidden');

	document.getElementById('svg-disconnected').classList.remove('hidden');
	document.getElementById('button-connect').classList.remove('hidden');
}
