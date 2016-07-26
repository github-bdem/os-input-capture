'use strict';
import KeyboardLogger from './keyboard-logger.js';
import MouseLogger from './mouse-logger.js';
import WindowLogger from './window-logger.js';
import _ from 'lodash';

class OsInputCapture {
    constructor(opts) {
        this.opts = opts;
        this.active = false;
        let { keyboardOptions, mouseOptions, windowOptions } = opts;
        this.keyboardLogger = new KeyboardLogger(keyboardOptions, this);
        this.mouseLogger = new MouseLogger(mouseOptions, this);
        this.windowLogger = new WindowLogger(windowOptions);
    }
    toggleActive() {
        this.active = !this.active;
        this.keyboardLogger.toggleActive();
        this.mouseLogger.toggleActive();
        this.windowLogger.toggleActive();
    }
    getWindow() {
        this.windowLogger.get();
    }
}

export default (opts) => {
    if (!(this instanceof OsInputCapture)) {
        return new OsInputCapture(opts);
    }
};
