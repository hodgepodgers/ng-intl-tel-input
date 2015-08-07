angular.module('ngIntlTelInput', [])
  .provider('ngIntlTelInput', function () {
    var props = {};

    this.set = function (obj) {
      if (typeof obj === 'object') {
        for (var key in obj) {
          props[key] = obj[key];
        }
      }
    };

    this.$get = ['$log', function ($log) {
      return Object.create({}, {
        init: {
          value: function (elm, attrs) {
            var country = elm.attr('data-default-country');
            if (country) {
              props.defaultCountry = country;
            }
            if (!window.intlTelInputUtils) {
              $log.warn('intlTelInputUtils is not defined. Formatting and validation will not work.');
            }
            elm.intlTelInput(props);
          }
        },
      });
    }];
  });
