'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:PesquisarCtrl
 * @description
 * # PesquisarCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('PesquisarCtrl', function ($scope) {

    $scope.quantity = 9;
    $scope.orderProp = '';

    $scope.data = [
    	{
    		'nome':'Maria',
    		'dataNasc': new Date(),
            'price' : 150
    	},
        {
            'nome':'Roberta',
            'dataNasc': new Date(),
            'price' : 110
        },
        {
            'nome':'Julia',
            'dataNasc': new Date(),
            'price' : 1150
        },
        {
            'nome':'Debora',
            'dataNasc': new Date(),
            'price' : 50
        },
        {
            'nome':'Giulia',
            'dataNasc': new Date(),
            'price' : 230
        },
        {
            'nome':'Sabrina',
            'dataNasc': new Date(),
            'price' : 35
        },
        {
            'nome':'Carla',
            'dataNasc': new Date(),
            'price' : 80
        },
        {
            'nome':'Sandra',
            'dataNasc': new Date(),
            'price' : 120
        },
        {
            'nome':'Edite',
            'dataNasc': new Date(),
            'price' : 110
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        },
        {
            'nome':'Maria',
            'dataNasc': new Date(),
            'price' : 150
        }
	];

    //$scope.data = Restangular.all("projects").getList().$object;

  });
