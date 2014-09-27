'use strict';

angular.module('tropleindoApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute'
]);

angular.module('tropleindoApp').config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainCtrl'
		})
		.when('/new', {
			templateUrl: 'views/new.html',
			controller: 'NewCtrl'
		})
		.when('/details/:spotName', {
			templateUrl: 'views/details.html',
			controller: 'DetailsCtrl'
		})
		.otherwise({
			redirectTo: '/'
		})
	;
});
