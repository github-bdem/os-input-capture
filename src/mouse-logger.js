'use strict';

import _  from 'lodash';
import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import winston from 'winston';
import robot from 'robotjs';

class MouseLogger {
    constructor(opts, parent) {
        const defaultOpts = {
            inputPath: '/dev/input/mice',
            outputDir: path.resolve(__dirname, 'mouse')
        };
        this.active = false;
        this.opts = _.assign(defaultOpts, opts);
        fse.ensureDir(this.opts.outputDir, err => console.log(err));
        this.readStream = fs.createReadStream(this.opts.inputPath)
                            .on('data', buffer => {
                                this.handleMouseEvent(buffer);
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
    handleMouseEvent(buffer) {
        /* Mouse input event structuring graciously copied from
        *  https://gist.github.com/bfncs/2020943
        *  Seriously I cannot thank you enough Marc Loehe and Tim Caswell.
        *  The original header follows below
        */

        ////// begin shared work //////

        /**
        * Read Linux mouse(s) in node.js
        * Author: Marc Loehe (marcloehe@gmail.com)
        *
        * Adapted from Tim Caswell's nice solution to read a linux joystick
        * http://nodebits.org/linux-joystick
        * https://github.com/nodebits/linux-joystick
        */
        let event = {
            leftBtn: (buffer[0] & 1) > 0, // Bit 0
            rightBtn: (buffer[0] & 2) > 0, // Bit 1
            middleBtn: (buffer[0] & 4) > 0, // Bit 2
            xSign: (buffer[0] & 16) > 0, // Bit 4
            ySign: (buffer[0] & 32) > 0, // Bit 5
            xOverflow: (buffer[0] & 64) > 0, // Bit 6
            yOverflow: (buffer[0] & 128) > 0, // Bit 7
            xDelta: buffer.readInt8(1), // Byte 2 as signed int
            yDelta: buffer.readInt8(2) // Byte 3 as signed int
        };
        ////// end shared work //////

        if (this.active) {
            if (event.leftBtn || event.rightBtn || event.middleBtn) {
                // TODO: Handle clicking and dragging elegantly
                let { x, y } = robot.getMousePos();
                let { leftBtn, middleBtn, rightBtn } = event;
                let eventData = {
                    timeStamp: Date.now(),
                    x: x,
                    y: y,
                    leftBtn: leftBtn,
                    middleBtn: middleBtn,
                    rightBtn: rightBtn
                };
                this.writeStream.log('info', eventData);
                this.parent.getWindow();
            }
        }
    }
}


export default (opts, parent) => {
    if (!(this instanceof MouseLogger)) {
        return new MouseLogger(opts, parent);
    }
};
