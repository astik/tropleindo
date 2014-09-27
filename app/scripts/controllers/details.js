'use strict';

angular.module('tropleindoApp').controller('DetailsCtrl', function ($scope, $routeParams, $filter, measureService) {
	var spotName = $routeParams.spotName;
	console.log(spotName);
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
});
