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

    var urlApi = UserService.urlApi;

    /* faz a pesquisa baseada no cep ou na geolocation do usuário */
    $scope.findMarker = function(cep){

      var callback = $scope.showMarker;

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
    $scope.showMarker = function(resp){

      var geolocation = resp.geometry.location;

      $scope.filters.latitude = geolocation.lat();
      $scope.filters.longitude = geolocation.lng();

      $scope.endereco = resp.formatted_address;

      $scope.$apply();

      $scope.find();
    };

    /* Pesquisa os colaboradored */
    $scope.find = function(){
      $http.get(urlApi + '/api/index.php/pesquisar/colaboradores', { params : { data : $scope.filters }}).then(function(data){
        $scope.data = data.data;
      });
    };

    $scope.findMarker();

  });
