'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ContatoCtrl
 * @description
 * # ContatoCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ContatoCtrl', function ($scope, $http) {

	$scope.user = {};
	$scope.message = '';
	$scope.success = '';

  	$scope.sendContact = function(){
		$http({
		        method  : 'POST',
		        url     : 'api/index.php/contato',
		        data    : $.param($scope.user),  // pass in data as strings
		        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		    }).success(function() {
		                $scope.success = 'true';
		        }).error(function() {
		    	$scope.success = 'false';
		    });
	    };
  });
