describe('ng-intl-tel-input', function () {

  var $scope, form, doc, element;
  beforeEach(module('ngIntlTelInput'));
  beforeEach(inject(function ($compile, $rootScope) {
    $scope = $rootScope;
    doc = angular.element(
      '<form name="form">' +
      '<label for="tel">Telephone</label>' +
      '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input />' +
      '</form>'
    );
    $scope.model = {tel: ''};
    $compile(doc)($scope);
    $scope.$digest();
    form = $scope.form;
    element = doc.find('input').eq(0);
  }));


  it('should apply the intl-tel-input jquery plugin', function () {
    expect(doc.find('.intl-tel-input').length).toEqual(1);
  });

  it('should only apply the intl-tel-input jquery plugin to text fields', inject(function ($compile, $rootScope) {
    doc = angular.element(
      '<form name="form">' +
      '<input ng-model="model.tel" type="password" name="tel" ng-intl-tel-input />' +
      '</form>'
    );
    $compile(doc)($scope);
    $scope.$digest();
    expect(doc.find('.intl-tel-input').length).toEqual(0);
  }));

});
