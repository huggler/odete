'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:ServicosCtrl
 * @description
 * # ServicosCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('ServicosCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.add = function(){};
  });
