describe('ngIntlTelInput Provider', function () {
  var provider, element;
  describe('Provider Config', function () {

    beforeEach(module('ngIntlTelInput', function (ngIntlTelInputProvider) {
      provider = ngIntlTelInputProvider;
    }));
    beforeEach(inject(function (_$injector_, $compile) {
      $injector = _$injector_;
      element = angular.element(
        '<form name="form">' +
        '<label for="tel">Telephone</label>' +
        '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input />' +
        '</form>'
      );
    }));

    it('should allow the passsing of utils file', function () {
      var script = {'utilsScript': '/path/to/utils'};
      provider.set(script);
      var stub = sinon.stub(element, 'intlTelInput');
      $injector.invoke(provider.$get).init(element);
      expect(stub.calledWith(script)).toBe(true);
      stub.restore();
    });

    it('should set initial country', function () {
      provider.set({'initialCountry': 'af'});
      $injector.invoke(provider.$get).init(element);
      expect(element.intlTelInput('getSelectedCountryData').iso2).toEqual('af');
    });

    it('should set multiple properties', function () {
      var script = {'initialCountry': 'us', 'utilsScript': 'lol'};
      provider.set(script);
      var stub = sinon.stub(element, 'intlTelInput');
      $injector.invoke(provider.$get).init(element);
      expect(stub.calledWith(script)).toBe(true);
      stub.restore();
    });
  });

  describe('Attribute Config', function () {
    beforeEach(module('ngIntlTelInput', function (ngIntlTelInputProvider) {
      provider = ngIntlTelInputProvider;
    }));
    beforeEach(inject(function (_$injector_, $compile) {
      $injector = _$injector_;
      element = angular.element(
        '<form name="form">' +
        '<label for="tel">Telephone</label>' +
        '<input ng-model="model.tel" type="text" name="tel" ng-intl-tel-input data-initial-country="af"/>' +
        '</form>'
      );
    }));

    it('should override the default country', inject(function ($compile, $rootScope) {
      provider.set({'initialCountry': 'gb'});
      var input = element.find('input');
      $compile(element)($rootScope);
      $rootScope.$digest();
      expect(input.intlTelInput('getSelectedCountryData').iso2).toEqual('af');
    }));
  });
});
