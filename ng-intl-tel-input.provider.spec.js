describe('ngIntlTelInput Provider', function () {
  var provider;
  beforeEach(module('ngIntlTelInput', function (ngIntlTelInputProvider) {
    provider = ngIntlTelInputProvider;
  }));
  beforeEach(inject(function (_$injector_) {
    $injector = _$injector_;
  }));

  it('should allow the passsing of utils file', function () {
    provider.setUtilsFile('/path/to/utils');
    var ngIntlTel = $injector.invoke(provider.$get);
    expect(ngIntlTel.utilsFile).toEqual('/path/to/utils');
  });

  it('should set default country', function () {
    provider.setDefaultCountry('US');
    var ngIntlTel = $injector.invoke(provider.$get);
    expect(ngIntlTel.defaultCountry).toEqual('US');
  });
});

