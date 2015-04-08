/**
 * Learn Mode White List
 * v0.0.1 by Andy Pan
 *
 * on AngularJS
 */

(function(){
 
var lmwl = angular.module('lmwl', []);

lmwl.service('constants', [function(){
	return {
		VERSION: '0.0.2-snapshot',
		LAST_MODIFIED: '2014/4/8',
		MARKET_SOURCE: '/whitelist'
	}
}]);

lmwl.directive('wlAppGrid', ['$AppCollection', function($AppCollection) {
	// console.log($http);
	return {
		restrict: 'E',
		controller: ['$scope', function($scope) {
			$AppCollection.getList().success(function(resp, code) {
				if(code == 200 && resp.status == 'ok') {
					$scope.appList = resp.list;
				}
			});
			//console.log($AppCollection.list);
		}]
	}
}]);

lmwl.directive('wlAppItem', [function() {

	var errSrc = 'http://placehold.it/96';

	return {
		restrict: 'E',
		controller: ['$scope', function($scope) {
			
		}],
		link: function(scope, element, attrs) {
			var img = element.find('img').eq(0);
			img.bind('error', function() {
				if (img.attr('src') != errSrc) {
					img.attr('src', errSrc);
				}
			});
		}
	};
}]);

lmwl.factory('$AppCollection', ['$http', 'constants', function($http, CONST) {
	// var list = null;

	// function successHandler(resp, code) {
	// 	if (code == 200 && resp.status == 'ok') {
	// 		list = resp;
	// 	}
	// };
	
	return {
		getList: function() {
			return $http.get(CONST.MARKET_SOURCE);
		}
	};
}]);


})();
