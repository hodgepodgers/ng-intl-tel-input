var path = require('path');

exports.config = {
    rootElement: 'html',
    seleniumServerJar: __dirname + '/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:5000',

    specs: [
        path.resolve('./ng-intl-tel-input.directive.e2e.js')
    ],

    params: {},

    framework: 'mocha',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        browserName: 'firefox'
    },

    allScriptsTimeout: (1000 * 60 * 4),
    getPageTimeout: 60000,
    // Options to be passed to mocha
    mochaOpts: {
        slow: 5000,
        timeout: 60000,
        ui: 'bdd'
    },

    onPrepare: function () {
        rootDir = __dirname + '/..';
        var chai = require('chai')
            .use(require('chai-as-promised'));
        chai.config.truncateThreshold = 0;
        expect = chai.expect;
        browser.driver.get(browser.baseUrl);
    }
};
