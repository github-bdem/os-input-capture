'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WindowLogger = function () {
    function WindowLogger(opts) {
        _classCallCheck(this, WindowLogger);

        var defaultOpts = {
            outputDir: _path2.default.resolve(__dirname, 'window'),
            colorMode: '-monochrome',
            imageType: 'jpg'
        };
        this.opts = _lodash2.default.assign(defaultOpts, opts);
        _fsExtra2.default.ensureDir(this.opts.outputDir, function (err) {
            return console.log(err);
        });
    }

    _createClass(WindowLogger, [{
        key: 'get',
        value: function get() {
            if (this.active) {
                if (!_lodash2.default.isUndefined(this.opts.windowTitle)) {
                    var imgPath = _path2.default.resolve(this.opts.outputDir, new Date(Date.now()).toISOString() + '.jpg');
                    var command = 'import -window "' + this.opts.windowTitle + '" ' + this.opts.colorMode + ' ' + this.opts.imageType + ':' + imgPath;
                    _execa2.default.shell(command);
                }
            }
        }
    }, {
        key: 'toggleActive',
        value: function toggleActive() {
            this.active = !this.active;
        }
    }]);

    return WindowLogger;
}();

exports.default = function (opts) {
    if (!(undefined instanceof WindowLogger)) {
        return new WindowLogger(opts);
    }
};