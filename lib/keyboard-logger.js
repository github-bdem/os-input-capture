'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyboardLogger = function () {
    function KeyboardLogger(opts, parent) {
        var _this = this;

        _classCallCheck(this, KeyboardLogger);

        var defaultOpts = {
            inputPath: '/dev/input/by-path/platform-i8042-serio-0-event-kbd',
            outputDir: _path2.default.resolve(__dirname, 'keyboard')
        };
        this.active = false;
        this.opts = _lodash2.default.assign(defaultOpts, opts);
        _fsExtra2.default.ensureDir(this.opts.outputDir, function (err) {
            return console.log(err);
        });
        this.readStream = _fs2.default.createReadStream(this.opts.inputPath).on('data', function (buffer) {
            _this.handleKeyboardEvent(buffer);
        });
        this.writeStream = new _winston2.default.Logger({
            transports: [new _winston2.default.transports.File({ filename: _path2.default.resolve(this.opts.outputDir, new Date(Date.now()).toISOString() + '.input.log') })]
        });
        this.parent = parent;
    }

    _createClass(KeyboardLogger, [{
        key: 'toggleActive',
        value: function toggleActive() {
            this.active = !this.active;
        }
    }, {
        key: 'handleKeyboardEvent',
        value: function handleKeyboardEvent(buffer) {
            var eventData = { timeStamp: Date.now(), code: buffer.readUInt16LE(20), value: buffer.readInt32LE(44) };
            if ((eventData.code === 38 && !this.active || eventData.code === 37 && this.active) && eventData.value === 1) {
                if (!_lodash2.default.isUndefined(this.parent)) {
                    this.parent.toggleActive();
                }
                if (_lodash2.default.isUndefined(this.parent)) {
                    this.toggleActive();
                }
            }
            if (this.active) {
                this.writeStream.log('info', eventData);
                if (!_lodash2.default.isUndefined(this.parent)) {
                    if (!_lodash2.default.isUndefined(this.parent.getWindow)) {
                        this.parent.getWindow();
                    }
                }
            }
        }
    }]);

    return KeyboardLogger;
}();

exports.default = function (opts, parent) {
    if (!(undefined instanceof KeyboardLogger)) {
        return new KeyboardLogger(opts, parent);
    }
};