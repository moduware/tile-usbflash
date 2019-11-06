
document.addEventListener("WebViewApiReady", function(event) {
  console.log("checkin status");
  Nexpaq.API.Module.addEventListener("DataReceived", nativeDataUpdateHandler);

  checkStatus();

  setInterval(checkStatus, 15000);

});


/* =========== ON PAGE LOAD HANDLER */
document.addEventListener("DOMContentLoaded", function(event) {
	Nexpaq.Header.create("USB");
	Nexpaq.Header.customize({color: "white", iconColor:"white", backgroundColor:"#4BC3DA"});
	
	document.getElementById('button-connect').addEventListener('click', Connect);
	document.getElementById('button-disconnect').addEventListener('click', Disconnect);
	document.getElementById('button-connect-zh').addEventListener('click', Connect);
	document.getElementById('button-disconnect-zh').addEventListener('click', Disconnect);

	// document.getElementById('button-file-manager').addEventListener('click', function() {});
	
	if (window.ModuwareAPIIsReady) {
		ApiReadyActions();
	} else {
		document.addEventListener("WebViewApiReady", () => ApiReadyActions(), { once: true});
	}
});

function ApiReadyActions() {
	console.log('API IS READY', Moduware.Arguments.language);
	let language = Moduware.Arguments.language;
	if(language === 'zh') {
		document.getElementById("main-screen-chinese").classList.remove("hidden");
		document.getElementById("main-screen-english").classList.add("hidden");
	} else {
		document.getElementById("main-screen-english").classList.remove("hidden");
		document.getElementById("main-screen-chinese").classList.add("hidden");
	}
}
