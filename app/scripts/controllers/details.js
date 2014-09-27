'use strict';

angular.module('tropleindoApp').controller('DetailsCtrl', function ($scope, $routeParams, $filter, $window, measureService) {
	var spotName = $routeParams.spotName;

	measureService.getSpotByName(spotName).then(function (spot) {
		$scope.spot = spot;

		var i, l, measure;
		var graphData = [];
		var dateFilter = $filter('date');
		for (i = 0, l = spot.measures.length; i < l; i++) {
			measure = spot.measures[i];
			graphData.push({
				x: dateFilter(measure.timestamp, 'dd/MM'),
				y: [measure.value],
				tooltip: dateFilter(measure.timestamp, 'dd/MM/yyyy hh:mm') + ' : ' + [measure.value] + '%'
			});
		}

		$scope.graphInfo = {
			config: {
				labels: false
			},
			data: {
				series: [''],
				data: graphData
			}
		};
	});

	$scope.edit = function (measure) {
		measure.newTimestamp = new Date(parseInt(measure.timestamp, 10));
		measure.newValue = measure.value;
		measure.isEditing = true;
	};

	$scope.save = function (measure) {
		measure.timestamp = measure.newTimestamp.getTime();
		measure.value = measure.newValue;
		delete measure.isEditing;
		delete measure.newValue;
		delete measure.newTimestamp;
	};

	$scope.cancel = function (measure) {
		delete measure.isEditing;
		delete measure.newValue;
		delete measure.newTimestamp;
	};

	$scope.deleteSpotMeasure = function (spot, measure) {
		if ($window.confirm('Are you sure you want to delete this measure ?')) {
			measureService.deleteSpotMeasure(spot.spotName, measure);
		}
	};
});
