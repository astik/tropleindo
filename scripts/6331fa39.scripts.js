"use strict";angular.module("tropleindoApp",["ngCookies","ngResource","ngSanitize","ngRoute","angularCharts","ngStorage","datePicker"]),angular.module("tropleindoApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/new",{templateUrl:"views/new.html",controller:"NewCtrl"}).when("/details/:spotName",{templateUrl:"views/details.html",controller:"DetailsCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("tropleindoApp").factory("measureService",["$http","$log","$filter","$localStorage","$q",function(a,b,c,d,e){var f=d.$default({measures:[]}),g=f.measures,h=function(){b.debug("retrievedMeasures");var a,d,f,h=e.defer(),i=c("orderBy");for(a=0,d=g.length;d>a;a++)f=g[a],f.measures=i(f.measures,"timestamp",!1);return h.resolve(g),h.promise}(),i=function(a){b.debug("deleteSpot");var c,d,f,h=e.defer();for(c=0,d=g.length;d>c;c++)g[c].spotName===a&&(f=c);return g.splice(f,1),h.resolve(g),h.promise},j={};return j.getAllMeasures=function(){return b.debug("getAllMeasures"),h},j.getSpotByName=function(a){return b.debug("getSpotByName"),h.then(function(b){var c,d,e;for(c=0,d=b.length;d>c;c++)if(e=b[c],e.spotName===a)return e;return null})},j.createNewSpot=function(a){b.debug("createNewSpot");var c={spotName:a.spotName,measures:[{timestamp:(new Date).getTime(),value:a.firstMeasure}]};return h.then(function(a){return a.push(c),a})},j.addSpotMeasure=function(a,c){return b.debug("addMeasure"),j.getSpotByName(a).then(function(a){return a.measures.push({timestamp:(new Date).getTime(),value:c}),a})},j.deleteSpot=function(a){return b.debug("deleteSpot"),i(a)},j.deleteSpotMeasure=function(a,c){return b.debug("addMeasure"),j.getSpotByName(a).then(function(a){var b,d,e;for(b=0,d=a.measures.length;d>b;b++)a.measures[b].timestamp===c.timestamp&&(e=b);return a.measures.splice(e,1),a})},j}]),angular.module("tropleindoApp").controller("MainCtrl",["$scope","$window","measureService",function(a,b,c){c.getAllMeasures().then(function(b){a.measures=b}),a.addMeasure=function(a){a.newMeasure&&c.addSpotMeasure(a.spotName,a.newMeasure)},a.deleteSpot=function(a){b.confirm("Are you sure you want to delete this spot ?")&&c.deleteSpot(a.spotName)}}]),angular.module("tropleindoApp").controller("NewCtrl",["$scope","$location","measureService",function(a,b,c){a.createNewSpot=function(a){c.createNewSpot(a).then(function(){b.path("#/")})}}]),angular.module("tropleindoApp").controller("DetailsCtrl",["$scope","$routeParams","$filter","$window","measureService",function(a,b,c,d,e){var f=b.spotName;e.getSpotByName(f).then(function(b){a.spot=b;var d,e,f,g=[],h=c("date");for(d=0,e=b.measures.length;e>d;d++)f=b.measures[d],g.push({x:h(f.timestamp,"dd/MM"),y:[f.value],tooltip:h(f.timestamp,"dd/MM/yyyy hh:mm")+" : "+[f.value]+"%"});a.graphInfo={config:{labels:!1},data:{series:[""],data:g}}}),a.edit=function(a){a.newTimestamp=new Date(parseInt(a.timestamp,10)),a.newValue=a.value,a.isEditing=!0},a.save=function(a){a.timestamp=a.newTimestamp.getTime(),a.value=a.newValue,delete a.isEditing,delete a.newValue,delete a.newTimestamp},a.cancel=function(a){delete a.isEditing,delete a.newValue,delete a.newTimestamp},a.deleteSpotMeasure=function(a,b){d.confirm("Are you sure you want to delete this measure ?")&&e.deleteSpotMeasure(a.spotName,b)}}]);