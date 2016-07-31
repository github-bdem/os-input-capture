'use strict';

import path from 'path';
import execa from 'execa';
import _ from 'lodash';
import fse from 'fs-extra';

class WindowLogger {
    constructor(opts) {
        const defaultOpts = {
            outputDir: path.resolve(__dirname, 'window')
        };
        this.opts = _.assign(defaultOpts, opts);
        fse.ensureDir(this.opts.outputDir, err => console.log(err));
    }
    get() {
        if (this.active) {
            if (!_.isUndefined(this.opts.windowTitle)) {
                let imgPath = path.resolve(this.opts.outputDir, `${ new Date(Date.now()).toISOString() }.jpg`);
                let command = `import -window "${ this.opts.windowTitle }" -colorspace Gray jpg:${ imgPath }`;
                execa.shell(command);
            }
        }
    }
    toggleActive() {
        this.active = !this.active;
    }
}

export default (opts) => {
    if (!(this instanceof WindowLogger)) {
        return new WindowLogger(opts);
    }
};
