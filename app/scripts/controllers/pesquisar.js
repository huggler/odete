'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:PesquisarCtrl
 * @description
 * # PesquisarCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('PesquisarCtrl', function ($scope, $http, filters) {

    $scope.quantity = 9;
    $scope.orderProp = '';
    $scope.result = filters.someMethod();

    $scope.updateResults = function(){
      $http.get('api/index.php/pesquisar/colaboradores', { params : { data : $scope.filters }}).then(function(data){
        $scope.data = data.data;
      });
    };

    $scope.updateResults();

    //$scope.data = Restangular.all("projects").getList().$object;

  });
