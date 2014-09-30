'use strict';

describe('Controller: ServicosCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var ServicosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ServicosCtrl = $controller('ServicosCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
