'use strict';

angular.module('tropleindoApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute'
]);

angular.module('tropleindoApp').config(function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/main.html',
		controller : 'MainCtrl'
	})
	.otherwise({
		redirectTo : '/'
	});
});
