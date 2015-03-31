'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:BagunceiroCtrl
 * @description
 * # BagunceiroCtrl
 * Controller of the angularApp
 */
var app = angular.module('angularApp');

app.controller('ColaboradorCtrl', ['$scope', 'UserService', '$location', function($scope, UserService, $location) {
  var ColaboradorServices = new UserService();
  $scope.user = ColaboradorServices.user;
  $scope.getOperadoras = ColaboradorServices.getOperadoras;
  $scope.loginFacebook = function(){
    ColaboradorServices.loginFacebook(function(){
      $scope.$apply();
    });
  };
  $scope.save = function(){
    ColaboradorServices.save(function(data){
      $scope.success = data;
      $location.path('/');
    });
  };
  $scope.getCep = ColaboradorServices.getCep;
  $scope.getMarker = ColaboradorServices.getMarker;
  $scope.showPosition = ColaboradorServices.showPosition;
  $scope.showMap = ColaboradorServices.showMap;
  $scope.showAddress = ColaboradorServices.showAddress;
  $scope.user.tipo = 'COLABORADOR';

}]);

app.controller('BagunceiroCtrl', ['$scope', 'UserService','$location', function ($scope, UserService, $location) {
  var BagunceiroServices = new UserService();
  $scope.user = BagunceiroServices.user;
  $scope.getOperadoras = BagunceiroServices.getOperadoras;
  $scope.loginFacebook = function(){
    BagunceiroServices.loginFacebook(function(){
      $scope.$apply();
    });
  };

  $scope.save = function(){
    BagunceiroServices.save(function(data){
      $scope.success = data;
      $location.path('/');
    });
  };

  $scope.getCep = BagunceiroServices.getCep;
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

  $scope.addPhone = function(){
    $scope.user.telefones.push({ddd: 21, telefone: 333});
  };


}]);

app.directive('addTelefones', function() {
  return {
    restrict: 'EA',
    transclude: false,
    templateUrl: '/views/add-Telefones.html',
    scope : {
      operadoras : '=',
      fnphone : '='
    },
    link: function () {
    }
  };
});