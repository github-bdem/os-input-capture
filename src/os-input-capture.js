'use strict';
import KeyboardLogger from './keyboard-logger.js';
import MouseLogger from './mouse-logger.js';
import WindowLogger from './window-logger.js';
import _ from 'lodash';

class OsInputCapture {
    constructor(loggers = [], opts = {}) {
        this.opts = opts;
        this.active = false;
        if (_.findIndex(loggers, (item) => item === 'keyboard') !== -1) {
            this.addKeyboardLogger(opts);
        }
        if (_.findIndex(loggers, (item) => item === 'mouse') !== -1) {
            this.addMouseLogger(opts);
        }
        if (_.findIndex(loggers, (item) => item === 'window') !== -1) {
            this.addWindowLogger(opts);
        }
    }
    addKeyboardLogger(opts) {
        if (_.isUndefined(this.keyboardLogger)) {
            if (!_.isUndefined(opts)) {
                let { keyboardOptions } = opts;
                this.keyboardLogger = new KeyboardLogger(keyboardOptions, this);
            }
            if (_.isUndefined(opts)) {
                let { keyboardOptions } = this.opts;
                this.keyboardLogger = new KeyboardLogger(keyboardOptions, this);
            }
        } else {
            throw new Error('logger already present');
        }
    }
    addMouseLogger(opts) {
        if (_.isUndefined(this.mouseLogger)) {
            if (!_.isUndefined(opts)) {
                let { mouseOptions } = opts;
                this.mouseLogger = new MouseLogger(mouseOptions, this);
            }
            if (_.isUndefined(opts)) {
                let { mouseOptions } = this.opts;
                this.mouseLogger = new MouseLogger(mouseOptions, this);
            }
        } else {
            throw new Error('logger already present');
        }
    }
    addWindowLogger(opts) {
        if (_.isUndefined(this.windowLogger)) {
            if (!_.isUndefined(opts)) {
                let { windowOptions } = opts;
                this.windowLogger = new WindowLogger(windowOptions, this);
            }
            if (_.isUndefined(opts)) {
                let { windowOptions } = this.opts;
                this.windowLogger = new WindowLogger(windowOptions, this);
            }
        } else {
            throw new Error('logger already present');
        }
    }
    toggleActive() {
        this.active = !this.active;
        if (!_.isUndefined(this.keyboardLogger)) {
            this.keyboardLogger.toggleActive();
        }
        if (!_.isUndefined(this.mouseLogger)) {
            this.mouseLogger.toggleActive();
        }
        if (!_.isUndefined(this.windowLogger)) {
            this.windowLogger.toggleActive();
        }
    }
    getWindow() {
        if (!_.isUndefined(this.windowLogger)) {
            this.windowLogger.get();
        }
    }
}

let oic = exports;

oic.OsInputCapture = (loggers, opts) => {
    if (!(this instanceof OsInputCapture)) {
        return new OsInputCapture(loggers, opts);
    }
};
oic.KeyboardLogger = KeyboardLogger;
oic.MouseLogger = MouseLogger;
oic.WindowLogger = WindowLogger;
