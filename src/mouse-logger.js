'use strict';

class MouseLogger {
    constructor(opts) {
        this.opts = opts;
    }
}


export default (opts) => {
    if (!(this instanceof MouseLogger)) {
        return new MouseLogger(opts);
    }
}
