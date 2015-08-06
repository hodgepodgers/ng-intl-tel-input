angular.module('ngIntlTelInput', [])
  .provider('ngIntlTelInput', function () {
    var utilsFilePath;
    var defaultCountry;

    this.setUtilsFile = function (utilsFile) {
      utilsFilePath = utilsFile;
    };

    this.setDefaultCountry = function (dc) {
      defaultCountry = dc;
    };

    this.$get = function () {
      return Object.create({}, {
        utilsFile: {
          get: function () { return utilsFilePath; }
        },
        defaultCountry: {
          get: function () { return defaultCountry; }
        }
      });
    };
  });
