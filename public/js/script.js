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
		VERSION: '0.0.1',
		LAST_MODIFIED: '2014/4/4',
		MARKET_SOURCE: '/api/whitelist'
	}
}]);








})();