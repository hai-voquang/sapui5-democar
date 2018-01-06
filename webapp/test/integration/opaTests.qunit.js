sap.ui.require([
    "sap/ui/demo/cart/test/integration/configureOpa"
], function () {
    'use strict';

    // When defined, the being executed test results are initialized.
    // jQuery.sap.require('sap.ui.qunit.qunit-css');
    // jQuery.sap.require('sap.ui.thirdparty.qunit');
    // jQuery.sap.require('sap.ui.qunit.qunit-junit');
    QUnit.config.autostart = false;
    console.log('Starting QUnit Integration Tests');
    sap.ui.require([
        "sap/ui/demo/cart/test/integration/AllJourneys"
    ], function() {
        // configuration has been applied and the tests in the journeys have been loaded - start QUnit
        //QUnit.start();
    });
});
