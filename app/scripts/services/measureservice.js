'use strict';

angular.module('tropleindoApp').factory('measureService', function ($http, $log, $localStorage, $q) {
	var storage = $localStorage.$default({
		measures: []
	});
	var measures = storage.measures;

	var retrieveMeasures = function () {
		$log.debug('retrieveMeasures');
		var deferred = $q.defer();
		deferred.resolve(measures);
		return deferred.promise;
	};

	var deleteSpot = function (spotName) {
		$log.debug('deleteSpot');
		var deferred = $q.defer();
		var i, l, spot, indexToRemove;
		for (i = 0, l = measures.length; i < l; i++) {
			spot = measures[i];
			if (spot.spotName === spotName) {
				indexToRemove = i;
			}
		}
		measures.splice(indexToRemove, 1);
		deferred.resolve(measures);
		return deferred.promise;
	};


	var api = {};

	api.getAllMeasures = function () {
		$log.debug('getAllMeasures');
		return retrieveMeasures();
	};

	api.getSpotByName = function (spotName) {
		$log.debug('getSpotByName');
		return retrieveMeasures().then(function (spotList) {
			var i, l, spot;
			for (i = 0, l = spotList.length; i < l; i++) {
				spot = spotList[i];
				if (spot.spotName === spotName) {
					return spot;
				}
			}
			return null;
		});
	};

	api.createNewSpot = function (newSpot) {
		$log.debug('createNewSpot');
		var spotToInsert = {
			spotName: newSpot.spotName,
			measures: [
				{
					timestamp: (new Date()).getTime(),
					value: newSpot.firstMeasure
				}
			]
		};
		return retrieveMeasures().then(function (spotList) {
			spotList.push(spotToInsert);
			return spotList;
		});
	};

	api.addMeasure = function (spotName, measure) {
		$log.debug('addMeasure');
		return api.getSpotByName(spotName).then(function (spot) {
			spot.measures.push({
					timestamp: (new Date()).getTime(),
					value: measure
				}
			);
			return spot;
		});
	};

	api.deleteSpot = function (spotName) {
		$log.debug('deleteSpot');
		return deleteSpot(spotName);
	};

	return api;
});
