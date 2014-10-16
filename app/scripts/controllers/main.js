'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularApp
 */
var geocoder;

angular.module('angularApp')
  .controller('MainCtrl', function ($scope, $http) {

  	$scope.result = 0;
    $scope.filters = {};
    $scope.filters.faxinar = false;
    $scope.filters.passar = false;
    $scope.filters.lavar = false;
    $scope.filters.cozinhar = false;

    $scope.filters.data = new Date();
    $scope.filters.periodo = '';

    $scope.filters.estado = '';
    $scope.filters.cidade = '';
    $scope.filters.bairro = '';

    $scope.filters.estados = '';
    $scope.filters.cidades = '';
    $scope.filters.bairros = '';


    $scope.updateResults = function(){
      $http.get('http://odete.felipehuggler.com/back/index.php/pesquisar', { params : { data : $scope.filters }}).then(function(data){
        $scope.result = data.data;
      });
    };

    $scope.getEstado = function(){
      $http.get('http://odete.felipehuggler.com/back/index.php/pesquisar/estado', { params : { data : $scope.filters }}).then(function(data){
        $scope.filters.estados = data.data;
      });
    };

    $scope.getCidade = function(){
      $http.get('http://odete.felipehuggler.com/back/index.php/pesquisar/cidade', { params : { data : $scope.filters }}).then(function(data){
        $scope.filters.cidades = data.data;
      });
    };

    $scope.getBairro = function(){
      $http.get('http://odete.felipehuggler.com/back/index.php/pesquisar/bairro', { params : { data : $scope.filters }}).then(function(data){
        $scope.filters.bairros = data.data;
      });
    };

   $scope.getMarker = function(){
      if (navigator.geolocation) {
          geocoder = new google.maps.Geocoder();
          navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.handleError);
      }else{
            $scope.getEstado();
            $scope.getCidade();
            $scope.getBairro();
            $scope.updateResults();
          }
    };

    $scope.showPosition = function(position) {
        $scope.showAddress(position);
    };

    $scope.showAddress = function(position){
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var location = {
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

                            if (typeAdress === location.numero) {
                                location.numero = address.short_name;
                            }
                            if (typeAdress === location.cidade) {
                                $scope.filters.cidade = address.short_name;
                            }
                            if (typeAdress === location.endereco) {
                                location.endereco = address.short_name;
                            }
                            if (typeAdress === location.zip) {
                                location.zip = address.short_name;
                            }
                            if (typeAdress === location.estado) {
                                $scope.filters.estado = address.short_name;
                            }
                            if (typeAdress === location.bairro) {
                                $scope.filters.bairro = address.short_name;
                            }
                            if (typeAdress === location.pais) {
                                location.pais = address.short_name;
                            }
                         }
                     }

                     $scope.$apply();

                    $scope.getEstado();
                    $scope.getCidade();
                    $scope.getBairro();

                    $scope.updateResults();
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


    $scope.getMarker();
  });
