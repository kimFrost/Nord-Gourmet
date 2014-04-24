;(function(window, document, undefined) {
	var Nordgourmet = new namespace("Nordgourmet");



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
		$scope.switchPane = function(id) {
			Nordgourmet.log(id);
			if (id != undefined) {
				$scope.data.activepane = id;
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





	// Modal Controller
	Nordgourmet.Angular.controller('ModalCtrl', ['$scope', '$rootScope', '$sce', function($scope, $rootScope, $sce) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data
		$scope.data.headline = "";
		$scope.data.videoHtml = "";
		// States
		$scope.states.show = false;

		/* Scope Functions
		 ===========================*/
		$scope.trustHtml = function(html) {
			return $sce.trustAsHtml(html);
		}
		$scope.trustSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		}
		$scope.toggle = function(state, data) {
			state = (state === undefined) ? null : state;
			data = (data === undefined) ? [] : data;
			if (state === 'hide') {
				$scope.states.show = false;
				$scope.data.headline = "";
				$scope.data.videoHtml = "";
			}
			if (state === 'show') {
				$scope.states.show = true;
				if (data.length === 2) {
					$scope.data.headline = data[0];
					$scope.data.videoHtml = data[1];
				}
			}
			else {
				$scope.states.show = !$scope.states.show;
				if (data.length === 2) {
					$scope.data.headline = data[0];
					$scope.data.videoHtml = data[1];
				}
				else {
					$scope.data.headline = "";
					$scope.data.videoHtml = "";
				}
			}
		}

		/* Bindings
		 ===========================*/
		$rootScope.$on('ModalToggle',function(event, data) {
			$scope.toggle('', data);
			$scope.toggle('', data);
		});
		$rootScope.$on('ModalShow',function(event, data) {
			$scope.toggle('show', data);

		});
		$rootScope.$on('ModalHide',function(event, data) {
			$scope.toggle('hide');
		});

	}]);

	// News List Controller
	Nordgourmet.Angular.controller('NewsListCtrl', ['$scope', '$rootScope', '$sce', function($scope, $rootScope, $sce) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data

		/* Scope Functions
		===========================*/
		$scope.enmitChange = function() {
			$rootScope.$broadcast('ModalShow', ['data1','data2']);
		}
		$scope.showVideo = function(headline, videoHtml) {
			headline = (headline === undefined) ? "" : headline;
			videoHtml = (videoHtml === undefined) ? "" : videoHtml;
			if (videoHtml != "") {
				$rootScope.$broadcast('ModalShow', [headline, videoHtml]);
			}
		}

		/* Bindings
		===========================*/

	}]);

	// Recipe List Controller
	Nordgourmet.Angular.controller('RecipeListCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data
		$scope.data.filters = {};
		$scope.data.currentNodeId = null;
		$scope.data.recipes = [];

		/* Scope Functions
		===========================*/
		$scope.updateRecipeList = function() {
			var url = '/umbraco/api/recipe/all/'+$scope.data.currentNodeId;


			$http({ method: 'Get', url: url, params: $scope.data.filters }).success(function (data, status, headers, config) {
				data = $scope.safemakeDataHtml(data); // safe make html for ng-repeat
				$scope.data.recipes = data; // Set data for ng-repeat
			}).error(function(data, status, headers, config) {
				// Error
				console.error("ERROR: ", data);
			});

		};
		$scope.safemakeDataHtml = function(data) {
			for (var item in data) {
				var dat = data[item];
				dat.ShortDescription = $sce.trustAsHtml(dat.ShortDescription);
			}
			return data;
		};

		$scope.toggleFilter = function(filter, value) {
			filter = (filter === undefined) ? false : filter;
			value = (value === undefined) ? false : value;
			if (filter != false && typeof filter === "string") {
				if ($scope.data.filters[filter] != undefined) {
					var filterIndex = -1;
					// Check if indexOf for array is supported
					if (!Array.prototype.indexOf) {
						// Array.indexOf is not supported
						var list = $scope.data.filters[filter];
						for (var i=0;i<list.length;i++) {
							var listValue = list[i];
							if (listValue === value) {
								filterIndex = i;
							}
						}
					}
					else {
						// Array.indexOf supported
						filterIndex = $scope.data.filters[filter].indexOf(value);
					}

					if (filterIndex != -1) {
						$scope.data.filters[filter].splice(filterIndex,1);
					}
					else {
						$scope.data.filters[filter].push(value);
					}
				}
				else {
					$scope.data.filters[filter] = [];
					$scope.data.filters[filter].push(value);
				}
			}
		};

		$scope.checkActiveFilter = function(filter, value) {
			filter = (filter === undefined) ? false : filter;
			value = (value === undefined) ? false : value;
			if ($scope.data.filters[filter] != undefined) {
				var filterIndex = -1;
				// Check if indexOf for array is supported
				if (!Array.prototype.indexOf) {
					// Array.indexOf is not supported
					var list = $scope.data.filters[filter];
					for (var i=0;i<list.length;i++) {
						var listValue = list[i];
						if (listValue === value) {
							filterIndex = i;
						}
					}
				}
				else {
					// Array.indexOf supported
					filterIndex = $scope.data.filters[filter].indexOf(value);
				}

				if (filterIndex != -1) {
					return true;
				}
				else {
					return false;
				}
			}
			else {
				return false;
			}
		};

		/* Bindings
		===========================*/
		$scope.$watch('data.filters', function(newVal, oldVal) {
			if (newVal) {
				$scope.updateRecipeList();

				location.hash = getQueryString($scope.data.filters);
			}
		}, true);

		var getObjFromQueryString = function () {
			var parms = location.hash.substr(1).split('&');

			var dataArray = {};

			for (var i = 0; i < parms.length; i++) {

				if (parms[i] !== undefined && parms[i] !== '' && parms[i] !== null) {

					var values = parms[i].split('=');

					if (angular.isUndefined(dataArray[values[0]])) {
						dataArray[values[0]] = [];
					}
					dataArray[values[0]].push(values[1]);
				}
			}

			return dataArray;
		};

		var getQueryString = function (obj) {
			var str = [];
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					if (obj[p].length > 0) {
						if (angular.isArray(obj[p])) {
							for (var valNumber in obj[p]) {
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p][valNumber]));
							}
						} else {
							str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						}
					}
				}
			}
			return str.join("&");
		};

		var f = getObjFromQueryString();
		$scope.data.filters = f;
	}]);

	Nordgourmet.Angular.controller('SearchWidgetCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

		$scope.search = function(url) {
			location.href = url + '#' + getQueryString($scope.filter);
		};

		var getQueryString = function (obj) {
			var str = [];
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					if (obj[p].length > 0) {
						if (angular.isArray(obj[p])) {
							for (var valNumber in obj[p]) {
								str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p][valNumber]));
							}
						} else {
							str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						}
					}
				}
			}
			return str.join("&");
		};

	}]);

})(window, window.document);
