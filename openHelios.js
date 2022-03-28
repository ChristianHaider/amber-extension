function onExecuted(result) {
  console.log("We executed in all subframes");
}

function onError(error) {
  console.log("Error:");
  console.log(error);
}

function openHelios(event){
	console.log('button clicked');
	console.log(event);
	/*
	function onCreated(windowInfo) {
		console.log('created');
		console.log(windowInfo);
	};
	function onError(error) {
		console.log('error');
		console.log(error);
	};
	var creating = browser.windows.create({
		url: "/helios.html",
		type: "panel",
		width: 1000,
		height: 600
	});
		console.log('creating');
		console.log(creating);
	creating.then(onCreated, onError);
	*/
	browser.tabs.executeScript({file: "/contentScript.js"}).then(onExecuted, onError);
};

browser.browserAction.onClicked.addListener(openHelios);
