'use strict';

class WindowLogger {
    constructor(opts) {
        this.opts = opts;
    }
}


export default (opts) => {
    if (!(this instanceof WindowLogger)) {
        return new WindowLogger(opts);
    }
}
