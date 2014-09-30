'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:PesquisarCtrl
 * @description
 * # PesquisarCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('PesquisarCtrl', function ($scope, Restangular) {

    $scope.data = [
    	{
    		'nome':'Maria Eduarda',
    		'dataNasc': new Date()
    	},{
    		'nome':'Maria Roberta',
    		'dataNasc': new Date()
    	},
    	{
    		'nome':'Bruna Souza',
    		'dataNasc': new Date()
    	},{
    		'nome':'Rita Lee',
    		'dataNasc': new Date()
    	},
    	{
    		'nome':'Sheila Carvalho',
    		'dataNasc': new Date()
    	}
	];

    //$scope.data = Restangular.all("projects").getList().$object;

  });
