sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/demo/cart/test/integration/arrangement/iframe/Arrangement",
	// QUnit additions
	"sap/ui/qunit/qunit-css",
	"sap/ui/thirdparty/qunit",
	"sap/ui/qunit/qunit-junit",
	"sap/ui/qunit/qunit-coverage",
	// Page Objects
	"sap/ui/demo/cart/test/integration/pageobjects/Home",
	"sap/ui/demo/cart/test/integration/pageobjects/Welcome",
	"sap/ui/demo/cart/test/integration/pageobjects/Category",
	"sap/ui/demo/cart/test/integration/pageobjects/Product",
	"sap/ui/demo/cart/test/integration/pageobjects/Cart",
	"sap/ui/demo/cart/test/integration/pageobjects/Dialog",
	"sap/ui/demo/cart/test/integration/pageobjects/Checkout",
	"sap/ui/demo/cart/test/integration/pageobjects/OrderCompleted"
], function (Opa5, Arrangement) {
	"use strict";

	Opa5.extendConfig({
		arrangements : new Arrangement(),
		actions: new Opa5({
			iLookAtTheScreen : function () {
				return this;
			}
		}),
		viewNamespace : "sap.ui.demo.cart.view.",
		autoWait: true
	});
});

