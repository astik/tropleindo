'use strict';

angular.module('tropleindoApp').controller('MainCtrl', function ($scope, measureService) {
	measureService.getAllMeasures().then(function (measures) {
		$scope.measures = measures;
	});

	$scope.addMeasure = function (spot) {
		measureService.addMeasure(spot.spotName, spot.newMeasure);
	};

	$scope.deleteSpot = function (spot) {
		if (confirm('Are you sure you want to delete this spot ?')) {
			measureService.deleteSpot(spot.spotName);
		}
	};
});
