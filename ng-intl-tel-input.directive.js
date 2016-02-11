angular.module('ngIntlTelInput')
  .directive('ngIntlTelInput', ['ngIntlTelInput', '$log',
    function (ngIntlTelInput, $log) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attr, ctrl) {
          // Warning for bad directive usage.
          if ((!!attr.type && (attr.type !== 'text' && attr.type !== 'tel')) || elm[0].tagName !== 'INPUT') {
            $log.warn('ng-intl-tel-input can only be applied to a *text* or *tel* input');
            return;
          }
          // Override default country.
          if (attr.defaultCountry) {
            ngIntlTelInput.set({defaultCountry: attr.defaultCountry});
          }
          // Override default number type.
          if (attr.defaultNumberType) {
            ngIntlTelInput.set({numberType: attr.defaultNumberType});
          }
          // Initialize.
          ngIntlTelInput.init(elm);
          // Validation.
          ctrl.$validators.ngIntlTelInput = function (value) {
            // if phone number is deleted / empty do not run phone number validation
            if (value || elm[0].value.length > 0) {
                return elm.intlTelInput("isValidNumber");
            } else {
                return true;
            }
          };
          // Set model value to valid, formatted version.
          ctrl.$parsers.push(function (value) {
            return elm.intlTelInput('getNumber').replace(/[^\d]/, '');
          });
          // Set input value to model value and trigger evaluation.
          ctrl.$formatters.push(function (value) {
            if (value) {
              if(value.charAt(0) !== '+') {
                value = '+' + value;
              }
              elm.intlTelInput('setNumber', value);
            }
            return value;
          });
        }
      };
    }]);
