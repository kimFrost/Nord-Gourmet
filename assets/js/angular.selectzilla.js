;(function(window, document, undefined) {
	var Bongrain = new namespace("Bongrain");

	Bongrain.Angular.directive('selectzilla', ['$rootScope', function($rootScope) {
		return {
			restrict: 'A',
			scope: {
				selectzilla: "@"
			},
			templateUrl: '/View/Angular/select.html',
			replace: true,
			controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
				// Default Data
				if ($scope.data === undefined) $scope.data = {};
				if ($scope.data.states === undefined) $scope.data.states = {};

				$scope.data.itemList = [];
				$scope.data.states.open = true;

				$element.find('option').each(function() {
					console.log(this);
				});

				// Scope Functions
				$scope.emitChange = function () {

				};

				// Directive Functions
			}],
			compile: function(tElement, tAttrs, transclude) {
				return {
					pre: function preLink(scope, iElement, iAttrs, controller) {
						// Bind click replace


						iElement.find('option').each(function() {
							console.log(this);
						});


						iElement.bind('click', function() {

							scope.$apply(function() {
								scope.data.states.open = !scope.data.states.open;
								Bongrain.log(scope.selectzilla);
							});
							//Bongrain.log(iElement);
							//Bongrain.log($rootScope);
						});

						/*
						iElement.bind('click', function() {
							//console.log(scope.selectzilla);

							var html = '<' + scope.replaceElem;
							html += ' src="'+ scope.replaceSrc +'"';
							html += ' width="'+ scope.replaceWidth +'"';
							html += ' frameborder="0"';
							html += ' seamless="true"';
							html += ' height="'+ scope.replaceHeight +'"';
							html += '>';
							html += '</'+ scope.replaceElem +'>';

							iElement.html(html);
							iElement.unbind('click.replace');
						});
						*/

					},
					post: function postLink(scope, iElement, iAttrs, controller) {

					}
				}
			}
		}
	}]);


})(window, window.document);
