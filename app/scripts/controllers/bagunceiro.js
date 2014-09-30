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
  .controller('BagunceiroCtrl', function ($scope, $http,Restangular) {

    $scope.projects = Restangular.all("projects").getList().$object;

    $scope.save = function(){
    	alert('oi seu porra loooka');
    };

    $scope.getCep = function(){
      $http.get("http://cep.correiocontrol.com.br/"+ $scope.txtCep +".json").success(function(data){
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
          navigator.geolocation.getCurrentPosition(showPosition, handleError);
      }
    };


    $scope.showPosition = function(position) {
        showMap(position);
        showAddress(position);
    };
 
    $scope.showMap = function(position){
        var latlon = position.coords.latitude + "," + position.coords.longitude;
        var imgUrl = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=14&size=400x300&sensor=false";
        $("#map").html("<img src='" + imgUrl + "'>");
    };
 
    $scope.showAddress = function(position){
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var city = "";
        var state = "";
 
        var postalCode = "";
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        for (var b = 0; b < results[0].address_components[i].types.length; b++) {
                            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                state = results[0].address_components[i];
                            }
                            if (results[0].address_components[i].types[b] == "locality") {
                                city = results[0].address_components[i];
                            }
                            if (results[0].address_components[i].types[b] == "postal_code") {
                                postalCode = results[0].address_components[i];
                            }
                         }
                     }
                     var state = state.short_name;
                     var city = city.short_name;
                     var zip = postalCode.short_name;
           
                    $("#localidade").val(city);
                    $("#cep").val(zip);
                 }
            }
        });
    };
 
    function handleError(error) {
        switch(error.code)
        {
            case error.PERMISSION_DENIED:
                alert("Usuário negou o pedido de Geolocalização.");
            break;
            case error.POSITION_UNAVAILABLE:
                alert("Informações sobre a localização está indisponível.");
            break;
            case error.TIMEOUT:
                alert("O pedido para obter a localização do usuário expirou.");
            break;
            case error.UNKNOWN_ERROR:
                alert("Ocorreu um erro desconhecido.");
            break;
         };
    };

  });
