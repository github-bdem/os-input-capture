'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WindowLogger = function WindowLogger(opts) {
    _classCallCheck(this, WindowLogger);

    this.opts = opts;
};

exports.default = function (opts) {
    if (!(undefined instanceof WindowLogger)) {
        return new WindowLogger(opts);
    }
};