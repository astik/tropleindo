'use strict';

angular.module('tropleindoApp').controller('NewCtrl', function ($scope, $location, measureService) {
	$scope.createNewSpot = function (newSpot) {
		measureService.createNewSpot(newSpot).then(function () {
			$location.path("#/");
		});
	};
});
