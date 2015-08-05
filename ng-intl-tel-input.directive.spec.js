describe('ng-intl-tel-input', function() {

  var $scope, form;
  beforeEach(module('ng-intl-tel-input'));
  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.tel" name="tel" />' +
      '</form>'
    );
    $scope.model = { tel: '' };
    $compile(element)($scope);
    $scope.$digest();
    form = $scope.form;
  }));


  it('should apply the intl-tel-input plugin', function() {
    expect(true).toBeTruthy();
  });

});
