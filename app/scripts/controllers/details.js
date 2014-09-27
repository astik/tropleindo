'use strict';

angular.module('tropleindoApp').controller('DetailsCtrl', function ($scope, $routeParams, measureService) {
	var spotName = $routeParams.spotName;
	console.log(spotName);
	measureService.getSpotByName(spotName).then(function (spot) {
		$scope.spot = spot;
	});
});
