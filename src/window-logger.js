'use strict';
//xboard: Fairy-Max 4.8V
// os.system("import -window "Nuclear Throne" -colorspace Gray jpg:" + os.path.join(output_path, "img-" + str(
//        event_index) + "-training.jpg"))

import path from 'path';
import execa from 'execa';
import _ from 'lodash';
import fse from 'fs-extra';

class WindowLogger {
    constructor(opts) {
        const defaultOpts = {
            windowTitle: 'xboard: Fairy-Max 4.8V',
            outputDir: path.resolve(__dirname, 'window')
        };
        this.opts = _.assign(opts, defaultOpts);
        fse.ensureDir(this.opts.outputDir, err => console.log(err));
    }
    get() {
        let imgPath = path.resolve(this.opts.outputDir, `${ new Date(Date.now()).toISOString() }.jpg`);
        let command = `import -window "${ this.opts.windowTitle }" -colorspace Gray jpg:${ imgPath }`;
        execa.shell(command).catch(error => {
            console.log('caught', error);
        });
    }
}

export default (opts) => {
    if (!(this instanceof WindowLogger)) {
        return new WindowLogger(opts);
    }
};
