var global = globalThis;
console.log(window);
console.log(window.opener);
var answer = browser.devtools.inspectedWindow.eval('window');
console.log(answer);
require(["helios/app", "amber/core/Platform-Browser"], function (amber) {
	var options;
	if (window.opener) {
		// Slave: use master's settings
	console.log('Slave');
		amber.globals.SmalltalkSettings = window.opener.require('amber/helpers').globals.SmalltalkSettings;
	} else {
		// Standalone: set default amd namespace
	console.log('Standalone');
		options = {'transport.defaultAmdNamespace': "helios"};
	}
	amber.initialize(options).then(function () {
		amber.globals.HLManager._setup();
	});
});