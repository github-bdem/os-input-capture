'use strict';

import _  from 'lodash';
import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import winston from 'winston';

class KeyboardLogger {
    constructor(opts, parent) {
        const defaultOpts = {
            inputPath: '/dev/input/by-path/platform-i8042-serio-0-event-kbd',
            outputDir: path.resolve(__dirname, 'keyboard')
        };
        this.active = false;
        this.opts = _.assign(defaultOpts, opts);
        fse.ensureDir(this.opts.outputDir, err => console.log(err));
        this.readStream = fs.createReadStream(this.opts.inputPath)
                            .on('data', buffer => {
                                this.handleKeyboardEvent(buffer);
                            });
        this.writeStream = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({ filename: path.resolve(this.opts.outputDir, `${ new Date(Date.now()).toISOString() }.input.log`) })
            ]
        });
        this.parent = parent;
    }
    toggleActive() {
        this.active = !this.active;
    }
    handleKeyboardEvent(buffer) {
        let eventData = { timeStamp: Date.now(), code: buffer.readUInt16LE(20), value: buffer.readInt32LE(44) };
        if (((eventData.code === 38 && !this.active) || (eventData.code === 37 && this.active)) && eventData.value === 1 ) {
            if (!_.isUndefined(this.parent)) {
                this.parent.toggleActive();
            }
            if (_.isUndefined(this.parent)) {
                this.toggleActive();
            }
        }
        if (this.active) {
            this.writeStream.log('info', eventData);
            if (!_.isUndefined(this.parent)) {
                if (!_.isUndefined(this.parent.getWindow)) {
                    this.parent.getWindow();
                }
            }
        }
    }
}


export default (opts, parent) => {
    if (!(this instanceof KeyboardLogger)) {
        return new KeyboardLogger(opts, parent);
    }
};
