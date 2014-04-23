;(function(window, document, undefined) {
	var Bongrain = new namespace("Bongrain");

	Bongrain.CookiePolitics = {
		element: null,
		init: function (elementName) {
			Bongrain.CookiePolitics.Element = $(elementName);

			var cookie = this.getCookie("cookie-accept");

			if (cookie === null) {
				Bongrain.CookiePolitics.Element.slideDown(1000);
			}

			Bongrain.CookiePolitics.Element.find(".close").click(function () {
				Bongrain.CookiePolitics.setCookie("cookie-accept", "true", 365);
				Bongrain.CookiePolitics.Element.slideUp(500);
				Bongrain.CookiePolitics.hideModal();
			});
			Bongrain.CookiePolitics.Element.find(".accept").click(function () {
				Bongrain.CookiePolitics.setCookie("cookie-accept", "true", 365);
				Bongrain.CookiePolitics.Element.slideUp(500);
				Bongrain.CookiePolitics.hideModal();
			});
			Bongrain.CookiePolitics.Element.find(".more").click(function () {
				Bongrain.CookiePolitics.showModal();
			});
		},
		getCookie: function (c_name) {
			var c_value = document.cookie;
			var c_start = c_value.indexOf(" " + c_name + "=");
			if (c_start == -1) {
				c_start = c_value.indexOf(c_name + "=");
			}
			if (c_start == -1) {
				c_value = null;
			}
			else {
				c_start = c_value.indexOf("=", c_start) + 1;
				var c_end = c_value.indexOf(";", c_start);
				if (c_end == -1) {
					c_end = c_value.length;
				}
				c_value = unescape(c_value.substring(c_start, c_end));
			}
			return c_value;
		},
		setCookie: function (c_name, value, exdays) {
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
			document.cookie = c_name + "=" + c_value;
		},
		showModal: function () {
			Bongrain.CookiePolitics.Element.find("#CookieModal").fadeIn();
			Bongrain.CookiePolitics.Element.after("<div id=\"modalOverlay\"></div>").fadeIn();
			var overlayElement = $("#modalOverlay");

			overlayElement.fadeIn();
			overlayElement.click(function () {
				Bongrain.CookiePolitics.hideModal();
			});
			$("body").addClass("noScroll");
		},
		hideModal: function () {
			Bongrain.CookiePolitics.Element.find("#CookieModal").fadeOut();
			//CookiePolitics.Element.append("<div id=\"modalOverlay\"></div>").fadeIn();
			$("#modalOverlay").fadeOut(function () {
				$("body").removeClass("noScroll");
				$(this).remove();

			});
		}
	};

	jQuery(function() {
		jQuery(window).load(function() {
			Bongrain.CookiePolitics.init('#cookiePolitics');
		});
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
