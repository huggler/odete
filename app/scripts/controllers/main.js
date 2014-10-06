'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope) {

  	$scope.result = 2545;

  	$scope.filterFaxinar = function(chk){
  		if($scope.faxinar){
			$scope.result += 200;
		}else{
			$scope.result -= 200;
  		}
  	};

  	$scope.filterPassar = function(chk){
  		if($scope.passar){
			$scope.result += 200;
		}else{
			$scope.result -= 200;
  		}
  	};


  });
