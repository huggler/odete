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
<<<<<<< e517806d77e2e74324a4b1bc40f2e4a09dbe9d1a
=======
<<<<<<< 59a0cbd055d7d8606fb0ea8586833060929c7b33
  });    
=======
>>>>>>> b107723ee2b5667207b5197b45849c2047e2ce7d
  });

  $scope.user.telefones.push({operadora: '', telefone: '', add: true});

  $scope.managerPhones = function (action, item) {
    switch(action){
      case "add": 
        item.add = false;
        $scope.user.telefones.push({
          operadora: '',
          telefone: '',
          add:($scope.user.telefones.length < 2 ? true : false )
        });
        break;
      case "del":
        var idx = $scope.user.telefones.indexOf(item);

        $scope.user.telefones.splice(idx, 1);
        $scope.user.telefones[$scope.user.telefones.length - 1].add = true;
        break;
<<<<<<< e517806d77e2e74324a4b1bc40f2e4a09dbe9d1a
    } 
  };

=======
    }
  };
>>>>>>> 75bf5f5fd4d60b738eae5c100c65491dc650bb76
>>>>>>> b107723ee2b5667207b5197b45849c2047e2ce7d

}]);

app.directive('addTelefones', function() {
  return {
    restrict: 'EA',
    transclude: false,
    templateUrl: '/views/add-Telefones.html',
    scope : {
<<<<<<< e517806d77e2e74324a4b1bc40f2e4a09dbe9d1a
=======
<<<<<<< 59a0cbd055d7d8606fb0ea8586833060929c7b33
      operadoras : '='
=======
>>>>>>> b107723ee2b5667207b5197b45849c2047e2ce7d
      operadoras : '=',
      operadoraName: '=?',
      fnphone : '=',
      item: '=telefone'
<<<<<<< e517806d77e2e74324a4b1bc40f2e4a09dbe9d1a
=======
>>>>>>> 75bf5f5fd4d60b738eae5c100c65491dc650bb76
>>>>>>> b107723ee2b5667207b5197b45849c2047e2ce7d
    },
    controller: function ($scope) {
      $scope.operadoraName = 'Operadoras';
      $scope.selectOperadora = function(name) {
        $scope.operadoraName = name;
      }
    }
  };
});