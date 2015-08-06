angular.module('ngIntlTelInput')
  .directive('ngIntlTelInput', function () {
    return {
      restrict: 'A',
      require: "ngModel",
      link: function (scope, elm, attr, ctrl) {
        if (attr.type !== 'text') return;
        elm.intlTelInput();
      }
    };
  });
