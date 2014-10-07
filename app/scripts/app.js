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
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true).hashPrefix('!');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/views/main.html',
        controller: 'MainCtrl'
      })
      .state('calendar', {
        url: '/calendar',
        templateUrl: '/views/calendar.html',
        controller: 'CalendarCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: '/views/about.html',
        controller: 'AboutCtrl'
      })
      .state('contato', {
        url: '/contato',
        templateUrl: '/views/contato.html',
        controller: 'ContatoCtrl'
      })
      .state('servicos', {
        url: '/servicos',
        templateUrl: '/views/servicos.html',
        controller: 'ServicosCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('cadastro', {
        url: '/cadastro',
        templateUrl: '/views/cadastro.html',
        controller: 'CadastroCtrl'
      })
      .state('bagunceiro', {
        parent: 'cadastro',
        url: '/bagunceiro',
        templateUrl: '/views/bagunceiro.html',
        controller: 'BagunceiroCtrl'
      })
      .state('odete', {
        parent: 'cadastro',
        url: '/odete',
        templateUrl: '/views/xibata.html',
        controller: 'BagunceiroCtrl'
      })
      .state('pesquisar', {
        url: '/pesquisar',
        templateUrl: '/views/pesquisar.html',
        controller: 'PesquisarCtrl'
      });
  }).run(function($rootScope,$state,$stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

  function testAPI() {
    FB.api('/me', function(response) {
      document.getElementById('status').innerHTML = '<a href="#" class="dropdown-toggle dropdown-perfil" data-toggle="dropdown">Olá, ' + response.first_name + '! <img src="http://graph.facebook.com/'+ response.id + '/picture"/ class="img-circle"/><b class="caret"></b></a><ul class="dropdown-menu"><li><a href="#"><i class="glyphicon glyphicon-user"></i> Meu Perfil</a></li><li><a href="#"><i class="glyphicon glyphicon-tasks"></i> Histórico</a></li><li><a href="/calendar"><i class="glyphicon glyphicon-calendar"></i> Agenda</a></li><li class="divider"></li><li><a href="#" class="btn-logout"><i class="glyphicon glyphicon-share-alt"></i> Sair</a></li></ul>';
    });
  }

// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = '';
    }
  }

  function logout(){
    FB.logout(function(response){
      statusChangeCallback(response);
    });
  }

  function login(callback){
    FB.login(function(response) {
      if(callback){
        callback(response);
      }else{
        statusChangeCallback(response);
      }
    },{scope: 'public_profile,publish_actions,user_location,user_about_me,email,user_birthday,user_friends'});
  }

//age_range,user_birthday,public_profile,user_friends

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  /*function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }*/

$(document).ready(function(){

  /* usado para fechar o menu */
  $('.navbar-collapse a').click(function(){
      var toggle = $('.navbar-toggle').is(':visible');
      if (toggle) {
        $('.navbar-collapse').collapse('hide');
      }
  });

  /* usado para alternar o css */    
  $('#css').change(function(){
      $('#css-default').attr('href', this.value);
  });

  /* usado para adicionar novos campos de telefones */
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
      var param = $(this).attr('href').replace('#','');
      var concept = $(this).text();

      $selectGroup.find('.concept').text(concept);
      $selectGroup.find('.input-group-select-val').val(param);

  };

  var countFormGroup = function ($form) {
      return $form.find('.form-group').length;
  };

  $(document).on('click', '.btn-add', addFormGroup);
  $(document).on('click', '.btn-remove', removeFormGroup);
  $(document).on('click', '.dropdown-menu a', selectFormGroup);

  $(document).on('click', '#btn-login-facebook', login);
  $(document).on('click', '.btn-logout', logout);
});






window.fbAsyncInit = function() {
  FB.init({
    appId      : '1579397852288566',
    xfbml      : true,
    version    : 'v2.1'
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = '//connect.facebook.net/en_US/sdk.js';
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));