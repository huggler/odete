'use strict';

/**
 * @ngdoc service
 * @name angularApp.UserService
 * @description
 * # UserService
 * Service in the angularApp.
 */
var geocoder;
var app = angular.module('angularApp');
app.service('UserService', [ '$http', function($http){
  var user = {
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
    errorMsg: '',
    servicos:[]
  };

  var urlApi = 'http://odete.me';

  var getServicos = function(callback){
    $http.get(urlApi + '/api/index.php/pesquisar/servicos').then(function(response){
      callback(response.data);
    });
  };
  var getOperadoras = function(callback){
    $http.get(urlApi + '/api/index.php/pesquisar/operadoras').then(function(response){
      callback(response.data);
    });
  };
  var loginFacebook = function(callback){
    FB.getLoginStatus(function(response) {
      if(response.status === 'connected' ){
        FB.api('/me', function(response) {
          renderMe(response, callback);
        });

      } else {
        FB.login(function() {
          FB.api('/me', function(response) {
            renderMe(response, callback);
          });
        });
      }
    });
  };
  var renderMe = function(response, callback){
    user.firstname = response.first_name;
    user.lastname = response.last_name;
    user.email = response.email;

    user.dia = parseInt(response.birthday.split('/')[1], 10);
    user.mes = parseInt(response.birthday.split('/')[0], 10);
    user.ano = parseInt(response.birthday.split('/')[2], 10);

    user.idfacebook = response.id;

    user.gender = response.gender;
    if(typeof callback === 'function'){
      callback();
    }
  };
  var save = function(data, callback){
      
    $http.post(urlApi + '/api/index.php/bagunceiro/cadastrar', data).success(function(data){
      if(callback){
        callback(data);
      }
    }).error(function(){
      window.toastr.error('Erro ao cadastrar. Tente novamente');
    });
  };
  var getCep = function(){
    var cep = user.cep.replace(/\D/g, '');
    if(!cep || cep === ''){
      window.toastr.error('Digite um cep');
      return false;
    }

    $http.get('http://cep.correiocontrol.com.br/'+ user.cep.replace(/\D/g, '') +'.json').success(function(data){
      user.cidade = data.localidade;
      user.endereco = data.logradouro;
      user.bairro = data.bairro;
      user.estado = data.uf;
    }).error(function(){
      window.toastr.error('Erro ao receber o cep. Tente novamente');
    });
  };

  //http://maps.google.com/maps/api/geocode/json?address=-23.6027226,-46.7881327&sensor=false.
  var getMarker = function(){
    if (navigator.geolocation) {
      geocoder = new google.maps.Geocoder();
      navigator.geolocation.getCurrentPosition(showPosition, handleError);
    }
  };
  var showPosition = function(position) {
    //$scope.showMap(position);
    showAddress(position);
  };
  var showMap = function(position){
    var wd = $('#map').width();
    var hg = 300;
    var scale = (wd > 340 ? 1 : 2);

    var latlon = position.coords.latitude + ',' + position.coords.longitude;
    var imgUrl = 'http://maps.googleapis.com/maps/api/staticmap?center=' + latlon + '&zoom=14&size='+wd+'x'+hg+'&sensor=false&scale='+ scale;
    $('#map').html('<img src=' + imgUrl + '>');
  };
  var showAddress = function(position, callback){
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var objCep = {
      numero : 'street_number',
      cidade : 'locality',
      endereco : 'route',
      cep : 'postal_code',
      estado : 'administrative_area_level_1',
      bairro : 'neighborhood',
      pais : 'country'
    };

    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var addressList = results[0].address_components;
          var addressListLen = addressList.length;
          var address = '';
          var typeAdressList = '';
          var typeAdressListLen = '';
          var typeAdress = '';

          for (var i = 0; i < addressListLen; i++) {

            address = addressList[i];
            typeAdressList = address.types;
            typeAdressListLen = typeAdressList.length;

            for (var y = 0; y < typeAdressListLen; y++) {

              typeAdress = typeAdressList[y];

              if (typeAdress === objCep.numero) {
                user.numero = address.short_name;
              }
              if (typeAdress === objCep.cidade) {
                user.cidade = address.short_name;
              }
              if (typeAdress === objCep.endereco) {
                user.endereco = address.short_name;
              }
              if (typeAdress === objCep.cep) {
                user.cep = address.short_name;
              }
              if (typeAdress === objCep.estado) {
                user.estado = address.short_name;
              }
              if (typeAdress === objCep.bairro) {
                user.bairro = address.short_name;
              }
              if (typeAdress === objCep.pais) {
                user.pais = address.short_name;
              }
            }
          }
          // $scope.$apply();
          if(callback){
            callback();
          }
        }
      }
    });
  };
  var handleError = function(error) {
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

  return function () {
    this.getOperadoras = getOperadoras;
    this.getServicos = getServicos;
    this.loginFacebook = loginFacebook;
    this.renderMe = renderMe;
    this.save = save;
    this.getCep = getCep;
    this.getMarker = getMarker;
    this.showPosition = showPosition;
    this.showMap = showMap;
    this.showAddress = showAddress;
    this.handleError = handleError;
    this.user = user;
  };
}]);