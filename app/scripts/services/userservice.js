'use strict';

angular.module('tropleindoApp').factory('userService', function () {
	var api = {};

	api.isLogged = function () {
		return false;
	};

	return api;
});
