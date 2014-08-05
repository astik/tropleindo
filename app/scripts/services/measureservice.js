'use strict';

angular.module('tropleindoApp').factory('measureService', function ($http) {
	var api = {};
	
	api.getAllMeasures = function(){
		return $http.get('measures.json').then(function(data){
			return data.data;
		});
	};

	return api;
});
