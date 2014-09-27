'use strict';

angular.module('tropleindoApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'angularCharts'
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
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginCtrl',
			access: {
				restricted: false
			}
		})
		.otherwise({
			redirectTo: '/'
		})
	;
});

angular.module('tropleindoApp').run(function ($rootScope, $location, $log, userService) {
	$rootScope.$on('$locationChangeStart', function (scope, currView) {
		if (!userService.isLogged() && (!currView || !currView.access || currView.access.restricted)) {
			$log.log('user is not logged and access is restricted : redirecting to personal settings (/login)');
			$location.path('/login');
		}
	});
});
