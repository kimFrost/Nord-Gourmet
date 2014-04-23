;(function(window, document, undefined) {
	var Bongrain = new namespace("Bongrain");
	Bongrain.Angular = angular.module('Bongrain', ['ngAnimate', 'ngSanitize']).
		config(function() { // provider-injector
			// This is an example of config block.
			// You can have as many of these as you want.
			// You can only inject Providers (not instances)
			// into the config blocks.
			//console.log("Config Module");
		}).
		run(function($rootScope) { // instance-injector
			// This is an example of a run block.
			// You can have as many of these as you want.
			// You can only inject instances (not Providers)
			// into the run blocks
			$rootScope.findme = "test value";
			//Bongrain.log("Run Module");
		});
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
