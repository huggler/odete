'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:CadastroCtrl
 * @description
 * # CadastroCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('CadastroCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.loadRegister = function(type){
    	if(type === 'odete'){
    		return 'views/bagunceiro.html';
    	}else if (type === 'bagunceiro'){
			return 'views/xibata.html';
    	}
    };

    $scope.save = function(){
    };

  });
