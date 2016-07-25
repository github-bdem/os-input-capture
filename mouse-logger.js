'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MouseLogger = function MouseLogger(opts) {
    _classCallCheck(this, MouseLogger);

    this.opts = opts;
};

exports.default = function (opts) {
    if (!(undefined instanceof MouseLogger)) {
        return new MouseLogger(opts);
    }
};