module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'sinon'],

    browsers: ['PhantomJS'],

    reporters: 'dots',

    autoWatch: true,

    singleRun: true,

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-sinon'
    ],

    files: [
      'bower_components/angularjs/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/intl-tel-input/build/js/intlTelInput.js',
      'bower_components/intl-tel-input/build/js/utils.js',
      'ng-intl-tel-input.module.js',
      'ng-intl-tel-input.provider.js',
      'ng-intl-tel-input.directive.js',
      'node_modules/phantomjs-polyfills/polyfills/function-bind-polyfill.js',
      'test-helpers.js',
      '*.spec.js'
    ]

  });
};
