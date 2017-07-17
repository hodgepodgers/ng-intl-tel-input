angular.module('ngIntlTelInput')
  .directive('ngIntlTelInput', ['ngIntlTelInput', '$log', '$window', '$parse',
    function (ngIntlTelInput, $log, $window, $parse) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attr, ctrl) {
          // fix issue #98, always track 'countrychange' event, but only update country model if necessary
          var countryTracked = false;

          // Warning for bad directive usage.
          if ((!!attr.type && (attr.type !== 'text' && attr.type !== 'tel')) || elm[0].tagName !== 'INPUT') {
            $log.warn('ng-intl-tel-input can only be applied to a *text* or *tel* input');
            return;
          }
          // Override default country.
          if (attr.initialCountry) {
            ngIntlTelInput.set({initialCountry: attr.initialCountry});
          }
          // Initialize.
          ngIntlTelInput.init(elm);
          // Set Selected Country Data.
          function setSelectedCountryData(model) {
            var getter = $parse(model);
            var setter = getter.assign;
            setter(scope, elm.intlTelInput('getSelectedCountryData'));
          }

          // Handle Country Changes.
          function handleCountryChange() {
            // fix issue #98: only update country model if necessary (if attr is supplied)
            if (countryTracked) {
              setSelectedCountryData(attr.selectedCountry);
            }
            // fix issue #98: always trigger 'change' to notify angular model controller
            elm.trigger('change');
          }

          // Country Change cleanup.
          function cleanUp() {
            elm.off('countrychange', handleCountryChange); // use 'elm' instead of '$window', there more than one
          }

          // Selected Country Data.
          if (attr.selectedCountry) {
            // fix issue #98: country model update is enabled
            countryTracked = true;
            setSelectedCountryData(attr.selectedCountry);
          }
          // fix issue #98: always track 'countrychange' event
          elm.on('countrychange', handleCountryChange); // use 'elm' instead of '$window', there more than one
          scope.$on('$destroy', cleanUp);

          // Validation.
          ctrl.$validators.ngIntlTelInput = function (value) {
            // if phone number is deleted / empty do not run phone number validation
            if (value || elm[0].value.length > 0) {
              return elm.intlTelInput('isValidNumber');
            } else {
              return true;
            }
          };
          // Set model value to valid, formatted version.
          ctrl.$parsers.push(function (value) {
            return elm.intlTelInput('getNumber');
          });
          // Set input value to model value and trigger evaluation.
          ctrl.$formatters.push(function (value) {
            if (value) {
              if (value.charAt(0) !== '+') {
                value = '+' + value;
              }
              elm.intlTelInput('setNumber', value);
            }
            return value;
          });
        }
      };
    }]);
