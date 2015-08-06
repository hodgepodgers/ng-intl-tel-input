module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    reporters: 'dots',

    autoWatch: true,

    singleRun: true,

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angularjs/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/intl-tel-input/build/js/intlTelInput.js',
      'bower_components/intl-tel-input/lib/libphonenumber/build/utils.js',
      'ng-intl-tel-input.module.js',
      'ng-intl-tel-input.directive.js',
      '*.spec.js'
    ]

  });
};
