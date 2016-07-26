'use strict';
import KeyboardLogger from './keyboard-logger.js';
import MouseLogger from './mouse-logger.js';
import WindowLogger from './window-logger.js';

class OsInputCapture {
    constructor(opts) {
        this.opts = opts;
        this.keyboardLogger = new KeyboardLogger();
        this.mouseLogger = new MouseLogger();
        this.windowLogger = new WindowLogger();
    }
}

export default (opts) => {
    if (!(this instanceof OsInputCapture)) {
        return new OsInputCapture(opts);
    }
};
