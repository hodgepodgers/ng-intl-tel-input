var page = Object.create({}, {
  phone: {
    get: function () {
      return $('selector');
    },
    set: function (number) {
      this.phone.sendKeys(number);
    }
  }
});

describe('ng-intl-tel-input directive', function () {
  it('should properly format a phone number');
});

