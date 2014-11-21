'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:BagunceiroCtrl
 * @description
 * # BagunceiroCtrl
 * Controller of the angularApp
 */
var geocoder;

var app = angular.module('angularApp');

app.controller('ColaboradorCtrl', ['$scope', 'UserService', function($scope, UserService) {
  var ColaboradorServices = new UserService();
  $scope.user = ColaboradorServices.user;
  $scope.getOperadoras = ColaboradorServices.getOperadoras;
  $scope.loginFacebook = function(){
    ColaboradorServices.loginFacebook(function(){
      $scope.$apply();
    });
  }
  $scope.save = function(){
    ColaboradorServices.save(function(data){
      $scope.success = data;
    });
  }
  $scope.getCep = ColaboradorServices.getCep;
  $scope.getMarker = ColaboradorServices.getMarker;
  $scope.showPosition = ColaboradorServices.showPosition;
  $scope.showMap = ColaboradorServices.showMap;
  $scope.showAddress = ColaboradorServices.showAddress;
  $scope.user.tipo = 'COLABORADOR';

}]);

app.controller('BagunceiroCtrl', ['$scope', '$http','UserService', function ($scope, $http, UserService) {
  var BagunceiroServices = new UserService();
  $scope.user = BagunceiroServices.user;
  $scope.getOperadoras = BagunceiroServices.getOperadoras;
  $scope.loginFacebook = function(){
    BagunceiroServices.loginFacebook(function(){
      $scope.$apply();
    });
  }

  $scope.loadingCep = false;
  $scope.save = BagunceiroServices.save;
  $scope.getCep = function(obj){
    $scope.loadingCep = true;
    BagunceiroServices.getCep(function(){
      $scope.loadingCep = false;
    });
  };
  $scope.getMarker = BagunceiroServices.getMarker;
  $scope.showPosition = BagunceiroServices.showPosition;
  $scope.showMap = BagunceiroServices.showMap;
  $scope.showAddress = BagunceiroServices.showAddress;

  $scope.user.tipo = 'BAGUNCEIRO';
  $scope.success = '';

  $scope.cacheOperadoras = [];

  $scope.getOperadoras(function(data){
    $scope.cacheOperadoras = data;
  });    

}]);

app.directive('addTelefones', function() {
  return {
    restrict: 'EA',
    transclude: false,
    templateUrl: '/views/add-Telefones.html',
    scope : {
      operadoras : '='
    },
    link: function () {
    }
  };
});