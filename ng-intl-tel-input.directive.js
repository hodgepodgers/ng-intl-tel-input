angular.module('ngIntlTelInput')
  .directive('ngIntlTelInput', ['$log', function ($log) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elm, attr, ctrl) {
        if (attr.type !== 'text') return;
        // Initialize.
        elm.intlTelInput();
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
