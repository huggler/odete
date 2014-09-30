'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'angular-loading-bar',
    'restangular'
  ])
  .controller('MainCtrl', function ($scope, $http, $timeout, cfpLoadingBar) {


    $scope.start = function() {
      cfpLoadingBar.start();
    };

    $scope.complete = function () {
      cfpLoadingBar.complete();
    };

    // fake the initial load so first time users can see the bar right away:
    $scope.start();
  })
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('main', {
        url: "/",
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('about', {
        url: "/about",
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .state('contato', {
        url: "/contato",
        templateUrl: 'views/contato.html',
        controller: 'ContatoCtrl'
      })
      .state('servicos', {
        url: "/servicos",
        templateUrl: 'views/servicos.html',
        controller: 'ServicosCtrl'
      })
      .state('login', {
        url: "/login",
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('cadastro', {
        url: "/cadastro",
        templateUrl: 'views/cadastro.html',
        controller: 'CadastroCtrl'
      })
      .state('bagunceiro', {
        parent: "cadastro",
        url: "/bagunceiro",
        templateUrl: 'views/bagunceiro.html',
        controller: 'BagunceiroCtrl'
      })
      .state('odete', {
        parent: "cadastro",
        url: "/odete",
        templateUrl: 'views/xibata.html',
        controller: 'BagunceiroCtrl'
      })
      .state('pesquisar', {
        url: "/pesquisar",
        templateUrl: 'views/pesquisar.html',
        controller: 'PesquisarCtrl'
      })
  }).run(function($rootScope,$state,$stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});


    (function ($) {
        $(function () {

            var addFormGroup = function (event) {
                event.preventDefault();

                var $formGroup = $(this).closest('.form-group');
                var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
                var $formGroupClone = $formGroup.clone();

                $(this)
                    .toggleClass('btn-success btn-add btn-danger btn-remove')
                    .html('–');

                $formGroupClone.find('input').val('');
                $formGroupClone.find('.concept').text('Operadora');
                $formGroupClone.insertAfter($formGroup);

                var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
                if ($multipleFormGroup.data('max') <= countFormGroup($multipleFormGroup)) {
                    $lastFormGroupLast.find('.btn-add').attr('disabled', true);
                }
            };

            var removeFormGroup = function (event) {
                event.preventDefault();

                var $formGroup = $(this).closest('.form-group');
                var $multipleFormGroup = $formGroup.closest('.multiple-form-group');

                var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
                if ($multipleFormGroup.data('max') >= countFormGroup($multipleFormGroup)) {
                    $lastFormGroupLast.find('.btn-add').attr('disabled', false);
                }

                $formGroup.remove();
            };

            var selectFormGroup = function (event) {
                event.preventDefault();

                var $selectGroup = $(this).closest('.input-group-select');
                var param = $(this).attr("href").replace("#","");
                var concept = $(this).text();

                $selectGroup.find('.concept').text(concept);
                $selectGroup.find('.input-group-select-val').val(param);

            }

            var countFormGroup = function ($form) {
                return $form.find('.form-group').length;
            };

            $(document).on('click', '.btn-add', addFormGroup);
            $(document).on('click', '.btn-remove', removeFormGroup);
            $(document).on('click', '.dropdown-menu a', selectFormGroup);

        });
    })(jQuery);

    $(document).ready(function(){
        $("#css").change(function(){
            $("#css-default").attr("href", this.value);
        });
    });