import { AsYouType } from 'libphonenumber-js'
angular.module('ngIntlTelInput', []);angular.module('ngIntlTelInput')
  .provider('ngIntlTelInput', function () {
    var me = this;
    var props = {};
    var setFn = function (obj) {
      if (typeof obj === 'object') {
        for (var key in obj) {
          props[key] = obj[key];
        }
      }
    };
    me.set = setFn;

    me.$get = ['$log', function ($log) {
      return Object.create(me, {
        init: {
          value: function (elm) {
            if (!window.intlTelInputUtils) {
              $log.warn('intlTelInputUtils is not defined. Formatting and validation will not work.');
            }
            elm.intlTelInput(props);
          }
        },
      });
    }];
  });
angular.module('ngIntlTelInput')
  .directive('ngIntlTelInput', ['ngIntlTelInput', '$log', '$window', '$parse', '$timeout',
    function (ngIntlTelInput, $log, $window, $parse, $timeout) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attr, ctrl) {
          var cleave;
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


          scope.$watch(function(){
            return elm[0].value;
          }, function(newVal, oldVal){
            if(oldVal.length>=2 && newVal.length>=2){
              if (newVal && newVal.length>5){
                newVal = newVal.replace("+33 0", "+33");
                elm.val(newVal);
              }
              if(oldVal.substr(0, 2) != newVal.substr(0, 2)){
                if(!ctrl.$validators.ngIntlTelInput(newVal)){
                    ctrl.$setValidity('ngIntlTelInput', false);
                }else{
                    ctrl.$setValidity('ngIntlTelInput', true);
                }
                const countryData = elm.intlTelInput('getSelectedCountryData');
                const formatted_value = new AsYouType(countryData.iso2).input(newVal);
                elm.val(formatted_value);
              }

            }

          });
          // Set Selected Country Data.
          function setSelectedCountryData(model) {
            var getter = $parse(model);
            var setter = getter.assign;
            setter(scope, elm.intlTelInput('getSelectedCountryData'));
          }
          // Handle Country Changes.
          function handleCountryChange() {
            setSelectedCountryData(attr.selectedCountry);
          }
          // Country Change cleanup.
          function cleanUp() {
            angular.element($window).off('countrychange', handleCountryChange);
          }
          // Selected Country Data.
          if (attr.selectedCountry) {
            setSelectedCountryData(attr.selectedCountry);
            angular.element($window).on('countrychange', handleCountryChange);
            scope.$on('$destroy', cleanUp);
          }
          // Validation.
          ctrl.$validators.ngIntlTelInput = function (value) {
            // if phone number is deleted / empty do not run phone number validation
            if (value || elm[0].value.length > 0) {
                return elm.intlTelInput('isValidNumber');
            } else {
                return true;
            }
          };
          //Set model value to valid, formatted version.
          ctrl.$parsers.push(function (value) {
            return elm.intlTelInput('getNumber');
          });
          ctrl.$formatters.push(function (value) {
            const countryData = elm.intlTelInput('getSelectedCountryData');
            return new AsYouType(countryData.iso2).input(value);
          });
          ctrl.$parsers.push(function (value) {
            const countryData = elm.intlTelInput('getSelectedCountryData');
            if (value && value.length>4 && value.substr(0, 4)=="+330")
              value = value.replace("+330", "+33");
            const formatted_value = new AsYouType(countryData.iso2).input(value);
            elm.val(formatted_value);
            return formatted_value;
          });
          //Set input value to model value and trigger evaluation.
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
