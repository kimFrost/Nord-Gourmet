;(function(window, document, undefined) {
	var Nordgourmet = new namespace("Nordgourmet");
	// Set default data
	Nordgourmet.data = {
		logCount: 0
	};
	Nordgourmet.log = function(msg) {
		try {
			if (this.data.logCount > 200) {
				console.clear();
				this.data.logCount = 0;
			}
			console.log(msg);
			this.data.logCount++;
		}
		catch(err) {
			//send error to developer platform
		}
	}

	// Make sure that module is exposed to window
	window.Nordgourmet = Nordgourmet;
})(window, window.document);


