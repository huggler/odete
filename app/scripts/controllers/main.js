'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
var geocoder;
angular.module('angularApp')
  .controller('MainCtrl', function ($scope, $http, filters, UserService) {

    $scope.user = UserService.user;

    $scope.filters = {};
    $scope.filters.servicos = $scope.user.servicos;

    $scope.filters.latitude = '';
    $scope.filters.longitude = '';

    $scope.filters.estado = '';
    $scope.filters.cidade = '';
    $scope.filters.bairro = '';

    $scope.filters.estados = '';
    $scope.filters.cidades = '';
    $scope.filters.bairros = '';

    $scope.quantity = 9;
    $scope.orderProp = '';

    $scope.endereco = '';

    UserService.getServicos(function(data){
      $scope.cacheServicos = data;
    });


    var apiUrl = 'http://odete.me/';

    $scope.updateResults = function(){
      $http.get(apiUrl + 'api/index.php/pesquisar', { params : { data : $scope.filters }}).then(function(data){
        $scope.result = data.data;
      });
    };

    /* recupera o total de odetes por estado */
    $scope.getEstado = function(){
      $http.get(apiUrl + 'api/index.php/pesquisar/estado', { params : { data : $scope.filters }}).then(function(data){
        $scope.filters.estados = data.data;
      });
    };

    $scope.clearEstado = function(){
      $scope.filters.estado = '';
      $scope.clearCidade();
      $scope.clearBairro();

      $scope.updateResults();
    };

    /* recupera o total de odetes por cidade */
    $scope.getCidade = function(){
      $http.get(apiUrl + 'api/index.php/pesquisar/cidade', { params : { data : $scope.filters }}).then(function(data){
        $scope.filters.cidades = data.data;
      });
    };

    $scope.clearCidade = function(){
      $scope.filters.cidade = '';
      $scope.clearBairro();
    };

    /* recupera o total de odetes por bairro */
    $scope.getBairro = function(){
      $http.get(apiUrl + 'api/index.php/pesquisar/bairro', { params : { data : $scope.filters }}).then(function(data){
        $scope.filters.bairros = data.data;
      });
    };

    $scope.clearBairro = function(){
      $scope.filters.bairro = '';
    };


    /* faz a pesquisa baseada no cep ou na geolocation do usuário */
    $scope.findMarker = function(cep){

      var callback = $scope.showAddress;

      if(cep){
        UserService.getCepbyGoogle(cep, function(resp){
          callback(resp[0]);
        });
      }else{
        UserService.getMarker(function(resp){
          callback(resp[0]);
        });        
      }
    };

    /* printa o resultado e chama a pesquisa */
    $scope.showAddress = function(resp){

      var geolocation = resp.geometry.location;

      $scope.filters.latitude = geolocation.A;
      $scope.filters.longitude = geolocation.F;

      $scope.endereco = resp.formatted_address;

      $scope.$apply();

      $scope.search();
    };


    $scope.search = function(){
      $http.get(apiUrl + 'api/index.php/pesquisar/colaboradores', { params : { data : $scope.filters }}).then(function(data){
        $scope.data = data.data;
      });
    };

    $scope.toggleCheck = function (servico) {
      if ($scope.user.servicos.indexOf(servico) === -1) {
          $scope.user.servicos.push(servico);
      } else {
          $scope.user.servicos.splice($scope.user.servicos.indexOf(servico), 1);
      }
    };
  });
