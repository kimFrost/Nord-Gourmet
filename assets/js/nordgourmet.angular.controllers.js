;(function(window, document, undefined) {
	var Nordgourmet = new namespace("Nordgourmet");


	// Nord Gourmet Controller
	Nordgourmet.Angular.controller('SplashCtrl', ['$scope', '$rootScope', '$element', function($scope, $rootScope, $element) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data
		$scope.data.originalImgSrc = $element.attr('data-imgsrc');
		$scope.data.itemCss = {
			'background-image': 'url(' + $scope.data.originalImgSrc + ')'
		};

		// States

		/* Scope Functions
		===========================*/

		/* Bindings
		===========================*/
		$rootScope.$on('SplashSwitchImgSrc',function(event, data) {
			var src = "";
			if (data.src != undefined && data.src.length < 4) {
				src = $scope.data.originalImgSrc;
			}
			else {
				src = data.src;
			}
			$scope.data.itemCss = {
				'background-image': 'url('+ src +')'
			}
		});
	}]);


	// Pane Controller
	Nordgourmet.Angular.controller('PaneCtrl', ['$scope', '$rootScope', '$element', function($scope, $rootScope, $element) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data
		$scope.data.activepane = 1;

		// States

		/* Scope Functions
		===========================*/
		$scope.switchPane = function(id, imgSrc) {
			Nordgourmet.log(id);
			if (id != undefined) {
				$scope.data.activepane = id;
			}
			if (imgSrc != undefined) {
				$rootScope.$broadcast('SplashSwitchImgSrc', {
					src: imgSrc
				});
			}
		};
		$scope.checkActive = function(id)  {
			if (id != undefined && id === $scope.data.activepane) {
				return true;
			}
			else {
				return false;
			}
		}
		/* Bindings
		 ===========================*/
	}]);


})(window, window.document);
