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

var _robotjs = require('robotjs');

var _robotjs2 = _interopRequireDefault(_robotjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MouseLogger = function () {
    function MouseLogger(opts, parent) {
        var _this = this;

        _classCallCheck(this, MouseLogger);

        var defaultOpts = {
            inputPath: '/dev/input/mice',
            outputDir: _path2.default.resolve(__dirname, 'mouse')
        };
        this.active = false;
        this.opts = _lodash2.default.assign(defaultOpts, opts);
        _fsExtra2.default.ensureDir(this.opts.outputDir, function (err) {
            return console.log(err);
        });
        this.readStream = _fs2.default.createReadStream(this.opts.inputPath).on('data', function (buffer) {
            _this.handleMouseEvent(buffer);
        });
        this.writeStream = new _winston2.default.Logger({
            transports: [new _winston2.default.transports.File({ filename: _path2.default.resolve(this.opts.outputDir, new Date(Date.now()).toISOString() + '.input.log') })]
        });
        this.parent = parent;
    }

    _createClass(MouseLogger, [{
        key: 'toggleActive',
        value: function toggleActive() {
            this.active = !this.active;
        }
    }, {
        key: 'handleMouseEvent',
        value: function handleMouseEvent(buffer) {
            /* Mouse input event structuring graciously copied from
            *  https://gist.github.com/bfncs/2020943
            *  Seriously I cannot thank you enough Marc Loehe and Tim Caswell.
            *  The original header follows below
            */

            ////// begin shared work //////

            /**
            * Read Linux mouse(s) in node.js
            * Author: Marc Loehe (marcloehe@gmail.com)
            *
            * Adapted from Tim Caswell's nice solution to read a linux joystick
            * http://nodebits.org/linux-joystick
            * https://github.com/nodebits/linux-joystick
            */
            var event = {
                leftBtn: (buffer[0] & 1) > 0, // Bit 0
                rightBtn: (buffer[0] & 2) > 0, // Bit 1
                middleBtn: (buffer[0] & 4) > 0 // Bit 2
            };
            ////// end shared work //////

            if (this.active) {
                if (event.leftBtn || event.rightBtn || event.middleBtn) {
                    // TODO: Handle clicking and dragging elegantly
                    var _robot$getMousePos = _robotjs2.default.getMousePos();

                    var x = _robot$getMousePos.x;
                    var y = _robot$getMousePos.y;
                    var leftBtn = event.leftBtn;
                    var middleBtn = event.middleBtn;
                    var rightBtn = event.rightBtn;

                    var eventData = {
                        timeStamp: Date.now(),
                        x: x,
                        y: y,
                        leftBtn: leftBtn,
                        middleBtn: middleBtn,
                        rightBtn: rightBtn
                    };
                    this.writeStream.log('info', eventData);
                    if (!_lodash2.default.isUndefined(this.parent)) {
                        if (!_lodash2.default.isUndefined(this.parent.getWindow)) {
                            this.parent.getWindow();
                        }
                    }
                }
            }
        }
    }]);

    return MouseLogger;
}();

exports.default = function (opts, parent) {
    if (!(undefined instanceof MouseLogger)) {
        return new MouseLogger(opts, parent);
    }
};