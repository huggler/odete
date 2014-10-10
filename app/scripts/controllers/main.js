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

    $scope.filters.estado = '';
    $scope.filters.cidade = '';
    $scope.filters.bairro = '';

    $scope.filters.estados = '';
    $scope.filters.cidades = '';
    $scope.filters.bairros = '';


    $scope.updateResults = function(){
      $http.get('http://odete.felipehuggler.com/back/index.php/pesquisar', { params : { data : $scope.filters }}).then(function(data){
        $scope.result = data.data;
      });
    };

    $scope.getEstado = function(){
      $http.get('http://odete.felipehuggler.com/back/index.php/pesquisar/estado', { params : { data : $scope.filters }}).then(function(data){
        $scope.filters.estados = data.data;
      });
    };

    $scope.getCidade = function(){
      $http.get('http://odete.felipehuggler.com/back/index.php/pesquisar/cidade', { params : { data : $scope.filters }}).then(function(data){
        $scope.filters.cidades = data.data;
      });
    };

    $scope.getBairro = function(){
      $http.get('http://odete.felipehuggler.com/back/index.php/pesquisar/bairro', { params : { data : $scope.filters }}).then(function(data){
        $scope.filters.bairros = data.data;
      });
    };

    $scope.updateResults();
    $scope.getEstado();
    $scope.getCidade();
    $scope.getBairro();
  });
