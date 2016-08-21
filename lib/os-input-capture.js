'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keyboardLogger = require('./keyboard-logger.js');

var _keyboardLogger2 = _interopRequireDefault(_keyboardLogger);

var _mouseLogger = require('./mouse-logger.js');

var _mouseLogger2 = _interopRequireDefault(_mouseLogger);

var _windowLogger = require('./window-logger.js');

var _windowLogger2 = _interopRequireDefault(_windowLogger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OsInputCapture = function () {
    function OsInputCapture() {
        var loggers = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, OsInputCapture);

        this.opts = opts;
        this.active = false;
        if (_lodash2.default.findIndex(loggers, function (item) {
            return item === 'keyboard';
        }) !== -1) {
            this.addKeyboardLogger(opts);
        }
        if (_lodash2.default.findIndex(loggers, function (item) {
            return item === 'mouse';
        }) !== -1) {
            this.addMouseLogger(opts);
        }
        if (_lodash2.default.findIndex(loggers, function (item) {
            return item === 'window';
        }) !== -1) {
            this.addWindowLogger(opts);
        }
    }

    _createClass(OsInputCapture, [{
        key: 'addKeyboardLogger',
        value: function addKeyboardLogger(opts) {
            if (_lodash2.default.isUndefined(this.keyboardLogger)) {
                if (!_lodash2.default.isUndefined(opts)) {
                    var keyboardOptions = opts.keyboardOptions;

                    this.keyboardLogger = new _keyboardLogger2.default(keyboardOptions, this);
                }
                if (_lodash2.default.isUndefined(opts)) {
                    var _keyboardOptions = this.opts.keyboardOptions;

                    this.keyboardLogger = new _keyboardLogger2.default(_keyboardOptions, this);
                }
            } else {
                throw new Error('logger already present');
            }
        }
    }, {
        key: 'addMouseLogger',
        value: function addMouseLogger(opts) {
            if (_lodash2.default.isUndefined(this.mouseLogger)) {
                if (!_lodash2.default.isUndefined(opts)) {
                    var mouseOptions = opts.mouseOptions;

                    this.mouseLogger = new _mouseLogger2.default(mouseOptions, this);
                }
                if (_lodash2.default.isUndefined(opts)) {
                    var _mouseOptions = this.opts.mouseOptions;

                    this.mouseLogger = new _mouseLogger2.default(_mouseOptions, this);
                }
            } else {
                throw new Error('logger already present');
            }
        }
    }, {
        key: 'addWindowLogger',
        value: function addWindowLogger(opts) {
            if (_lodash2.default.isUndefined(this.windowLogger)) {
                if (!_lodash2.default.isUndefined(opts)) {
                    var windowOptions = opts.windowOptions;

                    this.windowLogger = new _windowLogger2.default(windowOptions, this);
                }
                if (_lodash2.default.isUndefined(opts)) {
                    var _windowOptions = this.opts.windowOptions;

                    this.windowLogger = new _windowLogger2.default(_windowOptions, this);
                }
            } else {
                throw new Error('logger already present');
            }
        }
    }, {
        key: 'toggleActive',
        value: function toggleActive() {
            this.active = !this.active;
            if (!_lodash2.default.isUndefined(this.keyboardLogger)) {
                this.keyboardLogger.toggleActive();
            }
            if (!_lodash2.default.isUndefined(this.mouseLogger)) {
                this.mouseLogger.toggleActive();
            }
            if (!_lodash2.default.isUndefined(this.windowLogger)) {
                this.windowLogger.toggleActive();
            }
        }
    }, {
        key: 'getWindow',
        value: function getWindow() {
            if (!_lodash2.default.isUndefined(this.windowLogger)) {
                this.windowLogger.get();
            }
        }
    }]);

    return OsInputCapture;
}();

var oic = exports;

oic.OsInputCapture = function (loggers, opts) {
    if (!(undefined instanceof OsInputCapture)) {
        return new OsInputCapture(loggers, opts);
    }
};
oic.KeyboardLogger = _keyboardLogger2.default;
oic.MouseLogger = _mouseLogger2.default;
oic.WindowLogger = _windowLogger2.default;