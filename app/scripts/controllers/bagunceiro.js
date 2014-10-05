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

    //$scope.projects = Restangular.all('projects').getList().$object;

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
      console.log(response);
      $scope.firstname = response.first_name;
      $scope.lastname = response.last_name;
      $scope.email = response.email;

      $scope.dia = parseInt(response.birthday.split('/')[1], 10);
      $scope.mes = parseInt(response.birthday.split('/')[0], 10);
      $scope.ano = parseInt(response.birthday.split('/')[2], 10);

      $scope.gender = response.gender;
    };

    $scope.save = function(){};

    $scope.getCep = function(){
      $http.get('http://cep.correiocontrol.com.br/'+ $scope.txtCep +'.json').success(function(data){
          $scope.localidade = data.localidade;
          $scope.logradouro = data.logradouro;
          $scope.bairro = data.bairro;

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
          zip : 'postal_code',
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
                                objCep.numero = address.short_name;
                            }
                            if (typeAdress === objCep.cidade) {
                                objCep.cidade = address.short_name;
                            }
                            if (typeAdress === objCep.endereco) {
                                objCep.endereco = address.short_name;
                            }
                            if (typeAdress === objCep.zip) {
                                objCep.zip = address.short_name;
                            }
                            if (typeAdress === objCep.estado) {
                                objCep.estado = address.short_name;
                            }
                            if (typeAdress === objCep.bairro) {
                                objCep.bairro = address.short_name;
                            }
                            if (typeAdress === objCep.pais) {
                                objCep.pais = address.short_name;
                            }
                         }
                     }

                     console.log(objCep);
                     $scope.cep = objCep;
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
  });