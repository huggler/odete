'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, $http) {

  	$scope.result = 0;
    $scope.filters = {};
    $scope.filters.faxinar = false;
    $scope.filters.passar = false;
    $scope.filters.lavar = false;
    $scope.filters.cozinhar = false;

    $scope.filters.data = new Date();
    $scope.filters.periodo = '';

    $scope.filters.uf = '';
    $scope.filters.cidade = '';
    $scope.filters.bairro = '';

    $scope.updateResults = function(){
      $http.get('back/index.php/pesquisar', { params : { data : $scope.filters }}).then(function(data){
        $scope.result = data.data;
      });
    };

    $scope.getCidades = function(){
      $http.get('http://odete.felipehuggler.com/back/index.php/pesquisar/cidade', { params : { data : $scope.filters }}).then(function(data){
        $scope.filters.cidade = data.data;
      });
    };

    $scope.updateResults();
    $scope.getCidades();
  });
