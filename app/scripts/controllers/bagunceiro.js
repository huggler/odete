'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:BagunceiroCtrl
 * @description
 * # BagunceiroCtrl
 * Controller of the angularApp
 */
var geocoder;

angular.module('angularApp')
  .controller('BagunceiroCtrl', function ($scope, $http) {

    $scope.user = {};
    $scope.user.firstname = '';
    $scope.user.lastname = '';
    $scope.user.email = '';

    $scope.user.senha = '';
    $scope.user.confirmsenha = '';

    $scope.user.dia = '';
    $scope.user.mes = '';
    $scope.user.ano = '';

    $scope.user.gender = '';

    $scope.user.telefones = '';

    $scope.user.cidade = '';
    $scope.user.estado = '';
    $scope.user.endereco = '';
    $scope.user.bairro = '';
    $scope.user.numero = '';
    $scope.user.cep = '';

    $scope.user.metragem = '';
    $scope.user.valor = '';
    $scope.user.quartos = '';
    $scope.user.banheiros = '';

    $scope.user.idfacebook = '';
    $scope.success = '';    

    $scope.loginFacebook = function(){
      FB.getLoginStatus(function(response) {
        if(response.status === 'connected' ){
            FB.api('/me', function(response) {
              $scope.renderMe(response);
            });

        }else{
          FB.login(function() {
            FB.api('/me', function(response) {
              $scope.renderMe(response);
            });
          });
        }
      });
    };

    $scope.renderMe = function(response){
      $scope.user.firstname = response.first_name;
      $scope.user.lastname = response.last_name;
      $scope.user.email = response.email;

      $scope.user.dia = parseInt(response.birthday.split('/')[1], 10);
      $scope.user.mes = parseInt(response.birthday.split('/')[0], 10);
      $scope.user.ano = parseInt(response.birthday.split('/')[2], 10);

      $scope.user.idfacebook = response.id;

      $scope.user.gender = response.gender;

      $scope.$apply();
    };

    $scope.save = function(){

      var dataForm = form2js('formbagunceiro');

      $http.get('http://odete.felipehuggler.com/back/index.php/bagunceiro/cadastrar', { params : {
        data : dataForm
      }}).then(function(data){
        $scope.success = data.data;
      });
    };

    $scope.getCep = function(){
      $http.get('http://cep.correiocontrol.com.br/'+ $scope.user.cep.replace(/\D/g, '') +'.json').success(function(data){
          $scope.user.cidade = data.localidade;
          $scope.user.endereco = data.logradouro;
          $scope.user.bairro = data.bairro;
          $scope.user.estado = data.uf;

          //http://cep.s1mp.net/40.310-000
      });
    };

    //http://maps.google.com/maps/api/geocode/json?address=-23.6027226,-46.7881327&sensor=false.
    $scope.getMarker = function(){
      if (navigator.geolocation) {
          geocoder = new google.maps.Geocoder();
          navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.handleError);
      }
    };

    $scope.showPosition = function(position) {
        //$scope.showMap(position);
        $scope.showAddress(position);
    };
 
    $scope.showMap = function(position){

      var wd = $('#map').width();
      var hg = 300;
      var scale = (wd > 340 ? 1 : 2);

      var latlon = position.coords.latitude + ',' + position.coords.longitude;
      var imgUrl = 'http://maps.googleapis.com/maps/api/staticmap?center=' + latlon + '&zoom=14&size='+wd+'x'+hg+'&sensor=false&scale='+ scale;
      $('#map').html('<img src=' + imgUrl + '>');
    };
 
    $scope.showAddress = function(position){
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

                        for (var b = 0; b < typeAdressListLen; b++) {

                          typeAdress = typeAdressList[b];

                            if (typeAdress === objCep.numero) {
                                $scope.user.numero = address.short_name;
                            }
                            if (typeAdress === objCep.cidade) {
                                $scope.user.cidade = address.short_name;
                            }
                            if (typeAdress === objCep.endereco) {
                                $scope.user.endereco = address.short_name;
                            }
                            if (typeAdress === objCep.cep) {
                                $scope.user.cep = address.short_name;
                            }
                            if (typeAdress === objCep.estado) {
                                $scope.user.estado = address.short_name;
                            }
                            if (typeAdress === objCep.bairro) {
                                $scope.user.bairro = address.short_name;
                            }
                            if (typeAdress === objCep.pais) {
                                $scope.user.pais = address.short_name;
                            }
                         }
                     }

                     $scope.$apply();
                 }
            }
        });
    };
 
    $scope.handleError = function(error) {
        switch(error.code){
            case error.PERMISSION_DENIED:
                $scope.errorMsg = ('Usuário negou o pedido de Geolocalização.');
            break;
            case error.POSITION_UNAVAILABLE:
                $scope.errorMsg = ('Informações sobre a localização está indisponível.');
            break;
            case error.TIMEOUT:
                $scope.errorMsg = ('O pedido para obter a localização do usuário expirou.');
            break;
            case error.UNKNOWN_ERROR:
                $scope.errorMsg = ('Ocorreu um erro desconhecido.');
            break;
         }
    };
  }).directive('addTelefones', function() {
    return {
      restrict: 'A',
      transclude: true,
      templateUrl: '/views/add-Telefones.html',
      link: function () {
      }
    };
});