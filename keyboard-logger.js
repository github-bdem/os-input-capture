'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyboardLogger = function KeyboardLogger(opts) {
    _classCallCheck(this, KeyboardLogger);

    this.opts = opts;
};

exports.default = function (opts) {
    if (!(undefined instanceof KeyboardLogger)) {
        return new KeyboardLogger(opts);
    }
};