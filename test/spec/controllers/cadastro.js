'use strict';

describe('Controller: CadastroCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var CadastroCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CadastroCtrl = $controller('CadastroCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
