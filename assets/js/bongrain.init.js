;(function(window, document, undefined) {
	var Bongrain = new namespace("Bongrain");
	// Set default data
	Bongrain.data = (Bongrain.data === undefined) ? {} : Bongrain.data;
	Bongrain.data.states = (Bongrain.data.states === undefined) ? {} : Bongrain.data.states;

	Bongrain.init = function() {
		this.log("init");

	};
	Bongrain.init();

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
