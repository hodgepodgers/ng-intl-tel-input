var page = Object.create({}, {
  phone: {
    get: function () {
      return $('#tel');
    },
    set: function (number) {
      this.phone.sendKeys(number);
    }
  },
  phoneDefaultCountry: {
    get: function () {
      return $('#tel-dc');
    },
    set: function (number) {
      this.phoneDefaultCountry.sendKeys(number);
    }
  }
});

describe('ng-intl-tel-input directive', function () {
  it('should properly format a phone number', function () {
    page.phone = '18002255288';
    expect(page.phone.getAttribute('value')).to.eventually.equal('18002255288');
  });

  it('should set default country to data-initial-country', function () {
    page.phoneDefaultCountry = '07400123456';
    expect(page.phoneDefaultCountry.getAttribute('value')).to.eventually.equal('07400123456');
  });

  it('should set the selected country data when a different country is selected', function () {
    element.all(by.css('.selected-flag')).get(1).click();
    element.all(by.css('.flag-container .country[data-country-code="af"] .flag-box .iti-flag')).get(1).click();
    page.phoneDefaultCountry = '1';
    expect(element(by.id('selectedCountry')).getText()).to.eventually.contain('Afghanistan');
  });

});
