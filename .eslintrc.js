module.exports = {
    "env": {
        "browser": true
    },
    "globals": {
        "sap": true,
        "jQuery": true,
        "QUnit": true,
        "__dirname": true,
        "require": true,
        "module": true,
        "sinon": true
    },
    "extends": "crockford",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "eqeqeq": [
            "error",
            "smart"
        ],
        "no-unused-vars": [
            "error",
            {
                "vars": "all",
                "args": "none"
            }
        ],
        "no-underscore-dangle": 0,
        "new-cap": 0,
        "no-plusplus": 0
    },
    "plugins": [
        "import"
    ]
};