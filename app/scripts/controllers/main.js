'use strict';

angular.module('tropleindoApp').controller('MainCtrl', function ($scope, $window, measureService) {
	measureService.getAllMeasures().then(function (measures) {
		$scope.measures = measures;
	});

	$scope.addMeasure = function (spot) {
		if (spot.newMeasure) {
			measureService.addSpotMeasure(spot.spotName, spot.newMeasure);
		}
	};

	$scope.deleteSpot = function (spot) {
		if ($window.confirm('Are you sure you want to delete this spot ?')) {
			measureService.deleteSpot(spot.spotName);
		}
	};
});
