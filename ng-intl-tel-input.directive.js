angular.module('ngIntlTelInput')
  .directive('ngIntlTelInput', ['ngIntlTelInput', function (ngIntlTelInput) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elm, attr, ctrl) {
        if (attr.type !== 'text') return;
        // Initialize.
        ngIntlTelInput.init(elm);
        // Validation.
        ctrl.$validators.ngIntlTelInput = function (value) {
          return elm.intlTelInput("isValidNumber");
        };
        // Set model value to valid, formatted version.
        ctrl.$parsers.push(function (value) {
          return elm.intlTelInput('getNumber');
        });
      }
    };
  }]);
