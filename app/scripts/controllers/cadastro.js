'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CadastroCtrl', ['$scope',function ($scope) {

    $scope.loadRegister = function(type){
    	if(type === 'odete'){
    		return 'views/bagunceiro.html';
    	}else if (type === 'bagunceiro'){
			return 'views/xibata.html';
    	}
    };
}]);