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
  .controller('MainCtrl', function ($scope, $http, UserService) {

    $scope.filters = {};

    $scope.filters.latitude = '';
    $scope.filters.longitude = '';

    var apiUrl = 'http://odete.me/';

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

      $scope.filters.latitude = geolocation.A || geolocation.G;
      $scope.filters.longitude = geolocation.F || geolocation.K;

      $scope.endereco = resp.formatted_address;

      $scope.$apply();

      $scope.search();
    };

    $scope.search = function(){
      $http.get(apiUrl + 'api/index.php/pesquisar/colaboradores', { params : { data : $scope.filters }}).then(function(data){
        $scope.data = data.data;
      });
    };

  });
