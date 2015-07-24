'use strict';

/**
 * @ngdoc service
 * @name angularApp.UserService
 * @description
 * # UserService
 * Service in the angularApp.
 */
var app = angular.module('angularApp');
app.service('UserService', ['$http', function($http){
  
  this.user = {
    firstname:'',
    lastname:'',
    email:'',
    senha:'',
    confirmsenha:'',
    dia:'',
    mes:'',
    ano:'',
    gender:'',
    telefones:[],
    cidade:'',
    estado:'',
    endereco:'',
    bairro:'',
    numero:'',
    cep:'',
    metragem:'',
    valor:'',
    quartos:'',
    banheiros:'',
    idfacebook:'',
    tipo:'',
    latitude:'',
    longitude:'',
    errorMsg: '',
    servicos:[]
  };

  var urlApi = 'http://odete.me';

  this.getServicos = function(callback){
    $http.get(urlApi + '/api/index.php/pesquisar/servicos').then(function(response){
      callback(response.data);
    });
  };

  this.getOperadoras = function(callback){
    $http.get(urlApi + '/api/index.php/pesquisar/operadoras').then(function(response){
      callback(response.data);
    });
  };

  this.loginFacebook = function(callback){
    
    FB.getLoginStatus(function(response) {

      if(response.status === 'connected'){

        FB.api('/me', function(response) {
          callback(response);
        });

      } else {

        FB.login(function(response) {
          if(response.authResponse) {
              FB.api('/me', function(response) {
                callback(response);
              });
          }
        });
      }
    });
  };

  this.save = function(data, callback){
      
    $http.post(urlApi + '/api/index.php/bagunceiro/cadastrar', data).success(function(data){
        callback(data);
    }).error(function(){
      window.toastr.error('Erro ao cadastrar. Tente novamente');
    });
  };
  
  /* retorna a cidade, bairro, endereco */
  this.getCep = function(cep, callback){

    $http.get('http://cep.correiocontrol.com.br/'+ cep.replace(/\D/g, '') +'.json').success(function(data){
      callback(data);
    }).error(function(){
      window.toastr.error('Erro ao receber o cep. Tente novamente');
    });
  };

  /* retorna latitude e longitude */
  this.getCepbyGoogle = function(cep, callback){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': cep + ', Brasil', 'region': 'BR'}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        callback(results);
      } else {
        window.alert('Geocode was not successful for the following reason: ' + status);
      }
    });    
  };

  //http://maps.google.com/maps/api/geocode/json?address=-23.6027226,-46.7881327&sensor=false.
  this.getMarker = function(callback){
 
    var handleError = this.handleError;

    if (navigator.geolocation) {
      var geocoder = new google.maps.Geocoder();
      navigator.geolocation.getCurrentPosition(function(position){

        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
                callback(results);
          }
        });
      }, handleError);
    }
  };

  this.handleError = function(error) {

    var user = this.user;

    switch(error.code){
      case error.PERMISSION_DENIED:
      user.errorMsg = ('Usuário negou o pedido de Geolocalização.');
      break;
      case error.POSITION_UNAVAILABLE:
      user.errorMsg = ('Informações sobre a localização está indisponível.');
      break;
      case error.TIMEOUT:
      user.errorMsg = ('O pedido para obter a localização do usuário expirou.');
      break;
      case error.UNKNOWN_ERROR:
      user.errorMsg = ('Ocorreu um erro desconhecido.');
      break;
    }
  };

}]);