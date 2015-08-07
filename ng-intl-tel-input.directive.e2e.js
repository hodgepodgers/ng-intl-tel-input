var page = Object.create({}, {
  phone: {
    get: function () {
      return $('input#tel');
    },
    set: function (number) {
      this.phone.sendKeys(number);
    }
  },
  phoneDefaultCountry: {
    get: function () {
      return $('input#tel-dc');
    },
    set: function (number) {
      this.phoneDefaultCountry.sendKeys(number);
    }
  }
});

describe('ng-intl-tel-input directive', function () {
  it('should properly format a phone number', function () {
    page.phone= '18002255288';
    expect(page.phone.getAttribute('value')).to.eventually.equal('1 800-225-5288');
  });

  it('should set default country to data-default-country', function () {
    page.phoneDefaultCountry = '07400123456';
    expect(page.phoneDefaultCountry.getAttribute('value')).to.eventually.equal('07400 123456');
  });
});

