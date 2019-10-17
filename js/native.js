
var lastStatus = null;
var lang = 'en';

function checkStatus() {
	console.log("checking status");
    Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'StatusCheck', []);
}

function Connect() {
	console.log("connecting..");
	Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Connect', [1]);
	if(lang === 'en') {
		document.getElementById('button-connect').textContent = "Connecting...";
	} else {
		document.getElementById('button-connect').textContent = "正在连接...";
	}
}

function Disconnect() {
	console.log("Disconnecting..");
	Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'Disconnect', [1]);
	if (lang === 'en') {
		document.getElementById('button-disconnect').textContent = "Disconnecting...";
	} else {
		document.getElementById('button-disconnect').textContent = "正在断开...";
	}
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

	if(lang === 'en') {
		document.getElementById('button-connect').textContent = "Connect";
	} else {
		document.getElementById('button-connect').textContent = "连接";
	}

	document.getElementById('button-connect').classList.add('hidden');
	document.getElementById('svg-disconnected').classList.add('hidden');

	document.getElementById('svg-connected').classList.remove('hidden');
	document.getElementById('button-disconnect').classList.remove('hidden');
	//document.getElementById('button-file-manager').classList.remove('hidden');
}

function onDisconnected() {
	lastStatus = 'disconnected';

	if(lang === 'en') {
		document.getElementById('button-disconnect').textContent = "Disconnect";
	} else {
		document.getElementById('button-disconnect').textContent = "断开";
	}

	//document.getElementById('button-file-manager').classList.add('hidden');
	document.getElementById('button-disconnect').classList.add('hidden');
	document.getElementById('svg-connected').classList.add('hidden');

	document.getElementById('svg-disconnected').classList.remove('hidden');
	document.getElementById('button-connect').classList.remove('hidden');
}
