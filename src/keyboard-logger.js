'use strict';

import _  from 'lodash';
import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import winston from 'winston';

class KeyboardLogger {
    constructor(opts) {
        const defaultOpts = {
            kbdPath: '/dev/input/by-path/platform-i8042-serio-0-event-kbd',
            keyboardOutputDir: path.resolve(__dirname, 'keyboard')
        };
        this.active = false;
        console.log('defaultOpts', defaultOpts);
        console.log('opts', opts);
        this.opts = _.assign(opts, defaultOpts);
        console.log('defaultOpts', defaultOpts);
        console.log('this.opts', this.opts);
        fse.ensureDir(this.opts.keyboardOutputDir, err => console.log(err));
        this.readStream = fs.createReadStream(this.opts.kbdPath)
                            .on('data', buffer => {
                                this.handleKeyboardEvent(buffer);
                            });
        this.writeStream = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({ filename: path.resolve(this.opts.keyboardOutputDir, `${ new Date(Date.now()).toISOString() }.input.log`) })
            ]
        });
    }
    handleKeyboardEvent(buffer) {
        let eventData = { timeStamp: Date.now(), code: buffer.readUInt16LE(20), value: buffer.readInt32LE(44) };
        if (eventData.code === 38 && eventData.value === 1 && !this.active) {
            this.active = true;
        }
        if (eventData.code === 37 && eventData.value === 1 && this.active) {
            this.active = false;
        }
        if (this.active) {
            this.writeStream.log('info', eventData);
        }
    }
}


export default (opts) => {
    if (!(this instanceof KeyboardLogger)) {
        return new KeyboardLogger(opts);
    }
}
