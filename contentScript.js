var global = globalThis;
require(['app'], function (amberPromise) {
	amberPromise.then(function (amber) {
		amber.initialize({
			'transport.defaultAmdNamespace': "amber-amberwebextension"
		}).then(function () {
			var heliosUrl = browser.runtime.getURL("helios.html");
			var winInfo = window.open(heliosUrl, "Helios", "width=1000,height=600");
			console.log('window.open');
			console.log(winInfo);
		});
	});
});
true;