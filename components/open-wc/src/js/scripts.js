
document.addEventListener('NexpaqAPIReady', function(event) {
	Nexpaq.API.Module.addEventListener('DataReceived', nativeDataUpdateHandler);

	checkStatus();

	setInterval(checkStatus, 15000);	

});


/* =========== ON PAGE LOAD HANDLER */
document.addEventListener("DOMContentLoaded", function(event) {
  	Nexpaq.Header.create("USB");
	Nexpaq.Header.customize({color: "white", iconColor:"white", backgroundColor:"#4BC3DA"});
	
	document.getElementById('button-connect').addEventListener('click', Connect);
	document.getElementById('button-disconnect').addEventListener('click', Disconnect);

	// document.getElementById('button-file-manager').addEventListener('click', function() {});

});

