var page = Object.create({}, {
  phone: {
    get: function () {
      return $('input#tel');
    },
    set: function (number) {
      this.phone.sendKeys(number);
    }
  }
});

describe('ng-intl-tel-input directive', function () {
  it('should properly format a phone number', function () {
    page.phone = '18002255288';
    expect(page.phone.getAttribute('value')).to.eventually.equal('1 800-225-5288');
  });
});

