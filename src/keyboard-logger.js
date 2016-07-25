'use strict';

class KeyboardLogger {
    constructor(opts) {
        this.opts = opts;
    }
}


export default (opts) => {
    if (!(this instanceof KeyboardLogger)) {
        return new KeyboardLogger(opts);
    }
}
