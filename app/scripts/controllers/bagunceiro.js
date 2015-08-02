'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:BagunceiroCtrl
 * @description
 * # BagunceiroCtrl
 * Controller of the angularApp
 */
var app = angular.module('angularApp');

app.controller('ColaboradorCtrl', ['$scope', 'UserService', '$location', function($scope, UserService, $location) {
  
  $scope.user = UserService.user;
  $scope.getOperadoras = UserService.getOperadoras;
  $scope.getServicos = UserService.getServicos;
  
  $scope.getCep = UserService.getCep;
  $scope.getMarker = UserService.getMarker;
  $scope.user.tipo = 'COLABORADOR';
  $scope.user.placeholderValor = 'Cobro até - Insira o valor que você acha justo cobrar pelos serviços.';

}]);

app.controller('BagunceiroCtrl', ['$scope', 'UserService','$location', function ($scope, UserService, $location) {
  
  $scope.user = UserService.user;
  $scope.user.placeholderValor = 'Pago até - Insira o valor que você acha justo pagar pelos serviços.';

  $scope.submited = false;
  
  /* faz o login no facebook */
  $scope.loginFb = function(){
    
    UserService.loginFacebook(function(resp){
      $scope.showFacebook(resp);
    });
  };
  
  /* render facebook */
  $scope.showFacebook = function(resp){

    $scope.user.firstname = resp.first_name;
    $scope.user.lastname = resp.last_name;
    $scope.user.email = resp.email;

    $scope.user.dia = parseInt(resp.birthday.split('/')[1], 10);
    $scope.user.mes = parseInt(resp.birthday.split('/')[0], 10);
    $scope.user.ano = parseInt(resp.birthday.split('/')[2], 10);

    $scope.user.gender = resp.gender;
    $scope.user.idfacebook = resp.id;

    $scope.$apply();

  };


  $scope.validate = function(){

    var user = $scope.user;

    if(user.firstname === ''){
      window.toastr.error('Digite seu Nome', 'Cadastro');
      return false;
    }

    if(user.lastname === ''){
      window.toastr.error('Digite seu SobreNome', 'Cadastro');
      return false;
    }

    return true;
  }

  /* registra os dados na base */
  $scope.register = function(){
    
    $scope.submited = true;

    if($scope.validate()){

      var user = $scope.user;

      /* verifica o cep */
      if(user.latitude === '' || user.longitude === ''){
        window.toastr.error('Digite novamente o seu CEP', 'Cadastro');
        return false;
      }

      /* verifica o telefone */
      var validadePhone = true;
      for (var i = user.telefones.length - 1; i >= 0; i--) {
        var phone = user.telefones[i];
        if(phone.operadora === '' || phone.telefone === ''){
          validadePhone = false;
        }
      }

      if(!validadePhone){
        window.toastr.error('Selecione a operadora e telefone', 'Cadastro');
        return false;
      }

      if(user.tipo === 'COLABORADOR' && user.servicos.length === 0){
        window.toastr.error('Selecione ao menos uma função', 'Cadastro');
        return false;
      }

      UserService.save(user, function(data){
        $scope.success = data;
        window.toastr.success('Conta criada com sucesso', 'Cadastro');
      });
    }
  };

  $scope.user.tipo = 'BAGUNCEIRO';
  $scope.success = '';
  $scope.cacheOperadoras = [];
  $scope.cacheServicos = [];

  $scope.user.telefones = [];
  $scope.user.telefones.push({operadora: '', telefone: '', add: true});

  /* retorna todas as operadoras */
  UserService.getOperadoras(function(data){
    $scope.cacheOperadoras = data;
  });

  /* retorna todos os servicos */
  UserService.getServicos(function(data){
    $scope.cacheServicos = data;
  });

  /* marca e desmarca o checkbox de servico */
  $scope.toggleCheck = function (servico) {
    if ($scope.user.servicos.indexOf(servico) === -1) {
        $scope.user.servicos.push(servico);
    } else {
        $scope.user.servicos.splice($scope.user.servicos.indexOf(servico), 1);
    }
  };

  /* retorna o endereco no modelo de consulta tradicional */
  $scope.getCep = function(cep){
    cep = cep.replace(/\D/g, '');
    if(!cep || cep === ''){
      window.toastr.error('Digite um cep');
      return false;
    }

    UserService.getCep(cep, function(data){

      $scope.user.cidade = data.localidade;
      $scope.user.endereco = data.logradouro;
      $scope.user.bairro = data.bairro;
      $scope.user.estado = data.uf;

    });
  };

  $scope.managerPhones = function (action, item) {
    switch(action){
      case 'add': 
        item.add = false;
        $scope.user.telefones.push({
          operadora: '',
          telefone: '',
          add:($scope.user.telefones.length < 2 ? true : false )
        });
        break;
      case 'del':
        var idx = $scope.user.telefones.indexOf(item);

        $scope.user.telefones.splice(idx, 1);
        $scope.user.telefones[$scope.user.telefones.length - 1].add = true;
        break;
    } 
  };

  /* retorna a latitude e longitude via google */
  $scope.getCepbyGoogle = function(cep){

    //var cep = cep.replace(/\D/g, '');
    if(!cep){
      window.toastr.error('Digite um cep');
      return false;
    }

    UserService.getCepbyGoogle(cep, function(resp){
      $scope.showAddress(resp[0]);
    });    
  };

  /* retorna minha posicao atual */
  $scope.getmyMarker = function(){
    UserService.getMarker(function(resp){
      $scope.showAddress(resp[0]);
    });
  };

  /* formata os dados */
  $scope.showAddress = function(resp){

    console.log(resp);

    var location = {
      numero : 'street_number',
      cidade : 'locality',
      endereco : 'route',
      zip : 'postal_code',
      estado : 'administrative_area_level_1',
      bairro : 'neighborhood',
      pais : 'country'
    };

    $scope.user.numero = '';
    $scope.user.cidade = '';
    $scope.user.endereco = '';
    $scope.user.estado = '';
    $scope.user.bairro = '';
    $scope.user.pais = '';
    $scope.user.latitude = '';
    $scope.user.longitude = '';


    var addressList = resp.address_components;
    var addressListLen = addressList.length;
    var address = '';
    var typeAdressList = '';
    var typeAdressListLen = '';
    var typeAdress = '';

    var geolocation = resp.geometry.location;

    $scope.user.latitude = geolocation.A || geolocation.G;
    $scope.user.longitude = geolocation.F || geolocation.K;

    $scope.user.endereco = resp.formatted_address;

    for (var i = 0; i < addressListLen; i++) {

      address = addressList[i];
      typeAdressList = address.types;
      typeAdressListLen = typeAdressList.length;

        for (var b = 0; b < typeAdressListLen; b++) {

          typeAdress = typeAdressList[b];

            if (typeAdress === location.numero) {
                $scope.user.numero = address.short_name;
            }
            if (typeAdress === location.cidade) {
                $scope.user.cidade = address.short_name;
            }
            if (typeAdress === location.endereco) {
                $scope.user.endereco = address.short_name;
            }
            if (typeAdress === location.estado) {
                $scope.user.estado = address.short_name;
            }
            if (typeAdress === location.zip) {
                //$scope.user.cep = $filter('cep')(address.short_name);
                if(address.short_name != ''){
                  if(address.short_name.length > 5){
                    console.log(address.short_name.length);
                    $scope.user.cep = address.short_name.replace(/\D/g, '');                    
                  }
                }
            }
            if (typeAdress === location.bairro) {
                $scope.user.bairro = address.short_name;
            }
            if (typeAdress === location.pais) {
                $scope.user.pais = address.short_name;
            }
         }
     }

      $scope.$apply();
  };


}]);

app.directive('addTelefones', function() {
  return {
    restrict: 'EA',
    transclude: false,
    templateUrl: '/views/add-Telefones.html',
    scope : {
      operadoras : '=',
      operadoraName: '=?',
      fnphone : '=',
      item: '=telefone'
    },
    controller: function ($scope) {
      $scope.operadoraName = 'Operadoras';
      $scope.selectOperadora = function(name) {
        $scope.operadoraName = name;
      };
    }
  };
});