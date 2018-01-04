// Karma configuration
module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'webapp',
        customContextFile: '../context.html',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['openui5', 'qunit'],

        browserDisconnectTimeout: 30000,

        // for phantomJS
        browserNoActivityTimeout: 60000,

        // list of files / patterns to load in the browser test2
        // Change sorting 2017.05.23
        // https://github.com/karma-runner/karma/commit/74bfdf3
        files: [{
            pattern: '**/*.qunit.js',
            served: true,
            included: true,
            watched: true,
            nocache: false
        },
        {
            pattern: '**/*',
            served: true,
            included: false,
            watched: true,
                // nocache: true
                // [2017-01-23 17:19:52.171] [DEBUG] watcher - Not preprocessing "%s" due to nocache
                // https://github.com/karma-runner/karma-coverage/issues/237
            nocache: false
        }
        ],

        // list of files to exclude
        exclude: [
            '/base/resources/**/*.js',
            '/base/test-resources/**/*'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            //'**/!(*.min).js': ['eslint'],
            'model/*.js': ['coverage'],
            'function/*.js': ['coverage']
        },


        proxies: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        //reporters: ['spec'],
        reporters: ['coverage', 'summary', 'html', 'junit'],

        // code coverage report setting for istanbul : https://github.com/gotwarlost/istanbul
        coverageReporter: {
            reporters: [{
                type: 'html', // html, lcov, lcovonly, text, text-summary, cobertura, teamcity
                dir: '../reports',
                subdir: '.',
                file: 'coverage.html'
            }, {
                type: 'cobertura', // html, lcov, lcovonly, text, text-summary, cobertura, teamcity
                dir: '../reports',
                subdir: '.'
            }]
        },

        // the default configuration
        junitReporter: {
            outputDir: '../reports', // results will be saved as $outputDir/$browserName.xml
            outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: true, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {} // key value pair of properties to add to the <properties> section of the report
        },

        specReporter: {
            suppressPassed: true,
            suppressSkipped: false,
            suppressFailed: false,
            suppressErrorSummary: false,
            maxLogLines: 5
        },

        summaryReporter: {
            // 'failed', 'skipped' or 'all'
            show: 'all',
            // Limit the spec label to this length
            specLength: 80,
            overviewColumn: false
        },

        htmlReporter: {
            outputFile: '../reports/results.html',
            pageTitle: 'Test Results',
            subPageTitle: 'Democart project : Unit Testing and Intergration Testing results',
            groupSuites: true,
            useCompactStyle: true
                //useLegacyStyle: true
        },

        eslint: {
            stopOnError: false,
            stopOnWarning: false,
            showWarnings: false,
            engine: {
                configFile: '.eslintrc.js'
            }
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        //logLevel: config.LOG_DISABLE,
        logLevel: config.LOG_ERROR,
        //logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        //autoWatchBatchDelay: 500,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //browsers: ['Chrome'],
        //browsers: ['PhantomJS_without_security', 'Chrome_without_security', 'Firefox_without_secuity', 'IE', 'Edge'],
        //browsers: ['Chrome_without_security', 'Firefox_without_secuity', 'IE', 'Edge'],
        //browsers: ['Chrome_without_security', 'Firefox_without_secuity', 'IE'],
        //browsers: ['PhantomJS_without_security'],
        browsers: ['Chrome_without_security'],


        customLaunchers: {
            PhantomJS_without_security: {
                base: 'PhantomJS',
                debug: true,
                options: {
                    settings: {
                        webSecurityEnabled: false
                    }
                },
                flags: ['--web-security=false', '--disk-cache=false']
            },
            Chrome_without_security: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            },
            Firefox_without_secuity: {
                base: 'Firefox',
                prefs: {
                    'media.navigator.permission.disabled': true
                }
            }
        },

        openui5: {
            path: 'https://sapui5.hana.ondemand.com/resources/sap-ui-core.js',
            useMockServer: false
        },

        client: {
            captureConsole: false,
            clearContext: false,
            openui5: {
                config: {
                    debug: 'false',
                    resourceroots: {
                        'sap.ui.demo.cart': '/base'
                    },
                    'xx-showLoadErrors': 'true'
                },
                mockserver: {
                    config: {
                        autoRespond: true
                    },
                    rootUri: '/base'
                }
            }
        },

        loggers: [{
            type: 'console'
        }, {
            type: 'file',
            filename: 'logs/karma.log',
            maxLogSize: 409600
        }],

        // report which specs are slower than 500ms
        reportSlowerThan: 500,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
