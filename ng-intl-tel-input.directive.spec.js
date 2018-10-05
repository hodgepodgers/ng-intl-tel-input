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
    element = (doc.find('input').eq(0))[0];
  }));


  it('should apply the intl-tel-input to text fields', function () {
    expect(doc[0].querySelector('.intl-tel-input')).not.toBeNull();
  });

  it('should apply the intl-tel-input to tel fields', inject(function ($compile, $rootScope) {
    doc = angular.element(
      '<form name="form">' +
      '<input ng-model="model.tel" type="tel" name="tel" ng-intl-tel-input />' +
      '</form>'
    );
    $compile(doc)($scope);
    $scope.$digest();
    expect(doc[0].querySelector('.intl-tel-input')).not.toBeNull();
  }));

  it('should apply the intl-tel-input to text and tel fields', inject(function ($compile, $rootScope) {
    doc = angular.element(
      '<form name="form">' +
      '<input ng-model="model.tel" type="password" name="tel" ng-intl-tel-input />' +
      '<input ng-model="model.tel" type="email" name="tel" ng-intl-tel-input />' +
      '<input ng-model="model.tel" type="number" name="tel" ng-intl-tel-input />' +
      '<input ng-model="model.tel" type="date" name="tel" ng-intl-tel-input />' +
      '</form>'
    );
    $compile(doc)($scope);
    $scope.$digest();
    expect(doc[0].querySelector('.intl-tel-input')).toBeNull();
  }));

  it('should set the field as invalid with bad input', function () {
    element.value = '07400 123456';
    element.dispatchEvent(new Event('input'));
    $scope.$digest();
    expect(form.tel.$error.ngIntlTelInput).toBeDefined();
    expect(form.tel.$valid).toBe(false);
  });

  it('should set the field as invalid with input longer than > 0', function () {
    element.value = '1';
    element.dispatchEvent(new Event('input'));
    $scope.$digest();
    expect(form.tel.$error.ngIntlTelInput).toBeDefined();
    expect(form.tel.$valid).toBe(false);
  });

  it('should set the field as valid with good input', function () {
    element.value = '2103128425';
    element.dispatchEvent(new Event('input'));
    $scope.$digest();
    expect(form.tel.$error.ngIntlTelInput).toBeUndefined();
    expect(form.tel.$valid).toBe(true);
  });

  it('should set the field as valid with empty input', function () {
    element.value = '';
    element.dispatchEvent(new Event('input'));
    $scope.$digest();
    expect(form.tel.$error.ngIntlTelInput).toBeUndefined();
    expect(form.tel.$valid).toBe(true);
  });

  it('should set the model value to the full phone number with dial code', function () {
    element.value = '2103128425';
    element.dispatchEvent(new Event('input'));
    $scope.$digest();
    expect($scope.model.tel).toEqual('+12103128425');
  });

  it('should set the model value to the full phone number with dial code and plus sign prefix', function () {
    element.value = '+12103128425';
    element.dispatchEvent(new Event('input'));
    $scope.$digest();
    expect($scope.model.tel).toEqual('+12103128425');
  });

  it('should not set the model value when invalid', function () {
    element.value = '07400 123456';
    element.dispatchEvent(new Event('input'));
    $scope.$digest();
    expect($scope.model.tel).toBeUndefined();
  });

  it('should set the initial country', inject(function ($compile) {
    doc = angular.element(
      '<form name="form">' +
      '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input data-initial-country="af" />' +
      '</form>'
    );
    $compile(doc)($scope);
    $scope.$digest();

    var iti = findLastCreatedItiInstance();
    expect(iti.getSelectedCountryData().iso2).toEqual('af');
  }));

  it('should set the country when model value is present', inject(function ($compile) {
    $scope.model.tel = '447400123456';
    doc = angular.element(
      '<form name="form">' +
      '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input />' +
      '</form>'
    );
    $compile(doc)($scope);
    $scope.$digest();

    var iti = findLastCreatedItiInstance();
    expect(iti.getSelectedCountryData().iso2).toEqual('gb');
  }));

  it('should set the country when model value is present with plus sign prefix', inject(function ($compile) {
    $scope.model.tel = '+447400123456';
    doc = angular.element(
      '<form name="form">' +
      '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input />' +
      '</form>'
    );
    $compile(doc)($scope);
    $scope.$digest();

    var iti = findLastCreatedItiInstance();
    expect(iti.getSelectedCountryData().iso2).toEqual('gb');
  }));

  it('should apply the intl-tel-input to input fields without a type declaration', inject(function ($compile) {
    doc = angular.element(
      '<form name="form">' +
      '<input ng-model="model.tel" name="tel" ng-intl-tel-input />' +
      '</form>'
    );
    $compile(doc)($scope);
    $scope.$digest();
    expect(doc[0].querySelector('.intl-tel-input')).not.toBeNull();
  }));

  it('should set the selected country data when data-selected-country attribute is present', inject(function ($compile) {
    $scope.model.selectedCountry = null;
    doc = angular.element(
      '<form name="form">' +
      '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input data-selected-country="model.selectedCountry" />' +
      '</form>'
    );
    $compile(doc)($scope);
    $scope.$digest();
    expect($scope.model.selectedCountry.iso2).toEqual('us');
  }));
});
