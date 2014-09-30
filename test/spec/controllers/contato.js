'use strict';

describe('Controller: ContatoCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var ContatoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContatoCtrl = $controller('ContatoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
