;(function(window, document, undefined) {
	var Bongrain = new namespace("Bongrain");
	// Set default data
	Bongrain.data = {
		logCount: 0
	};
	Bongrain.log = function(msg) {
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
	window.Bongrain = Bongrain;
})(window, window.document);



/*
var selectzilla = new Selectzilla({
	rootElem: '.recipes__filters',
	rootElemList: ".select",
	groupSelector: "[data-select-group]",
	valueSelector: "[data-select-value]"
});
*/

//console.log("selectzilla publics:");
//console.log(selectzilla);
//console.log("selectzilla privates:");
//selectzilla.logPrivates();

//var selectzilla = new Selectzilla({
	//elem: '.select'
//});
//selectzilla.init();

//var geramont = new Geramont({
	//rootElem: $("#spokesperson")
//});
//geramont.init();

//console.log(selectzilla);
