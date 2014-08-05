'use strict';

angular.module('tropleindoApp').controller('MainCtrl', function ($scope, measureService) {
	measureService.getAllMeasures().then(function(data){
		$scope.measures = data;
	});
});
