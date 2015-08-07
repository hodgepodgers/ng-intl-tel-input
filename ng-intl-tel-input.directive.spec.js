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

  it('should set the field as invalid with bad input', inject(function ($compile, $rootScope) {
    angular.element(element).val('07400 123456').trigger('input');
    $scope.$digest();
    expect(form.tel.$error.ngIntlTelInput).toBeDefined();
    expect(form.tel.$valid).toBe(false);
  }));

  it('should set the field as valid with good input', inject(function ($compile, $rootScope) {
    angular.element(element).val('2103128425').trigger('input');
    $scope.$digest();
    expect(form.tel.$error.ngIntlTelInput).toBeUndefined();
    expect(form.tel.$valid).toBe(true);
  }));

  it('should set the model value to the full phone number with dial code', inject(function ($compile, $rootScope) {
    angular.element(element).val('2103128425').trigger('input');
    $scope.$apply();
    expect($scope.model.tel).toEqual('+12103128425');
  }));

  it('should not set the model value when invalid', inject(function ($compile, $rootScope) {
    angular.element(element).val('07400 123456').trigger('input');
    $scope.$apply();
    expect($scope.model.tel).toBeUndefined();
  }));

  it('should set the default country', inject(function ($compile, $rootScope) {
    doc = angular.element(
      '<form name="form">' +
      '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input data-default-country="af" />' +
      '</form>'
    );
    $compile(doc)($rootScope);
    $rootScope.$digest();
    element = doc.find('input');
    expect(element.intlTelInput('getSelectedCountryData').iso2).toEqual('af');
  }));
});
