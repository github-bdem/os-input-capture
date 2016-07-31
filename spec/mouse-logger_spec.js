'use strict';

import MouseLogger from '../lib/mouse-logger.js';
import path from 'path';
import fs from 'fs';
import del from 'del';
import _ from 'lodash';

let globals = {};

describe('MouseLogger', () => {
    beforeEach(() => {
        globals.parent = {
            toggleActive: () => {},
            getWindow: () => {}
        };
        globals.defaultOpts = {
            inputPath: '/dev/input/by-path/platform-i8042-serio-0-event-kbd',
            outputDir: path.resolve(__dirname, '../lib/', 'keyboard')
        };
        globals.defaultOpts = {
            inputPath: '/dev/input/mice',
            outputDir: path.resolve(__dirname, '../lib/', 'mouse')
        };
        _.assign(globals, { MouseLogger, fs, path, del });
    });
    it('should be defined', () => {
        let mouseLogger = new globals.MouseLogger();
        expect(mouseLogger).toBeDefined();
    });
    it('should initialize the opts values with defaults if not present', () => {
        let mouseLogger = new globals.MouseLogger();
        expect(mouseLogger.opts).toEqual(globals.defaultOpts);
    });
    it('should create the mouse log output dir on write if not present', () => {
        globals.fs.lstat(globals.defaultOpts.outputDir, (err, stats) => {
            if (!err && stats.isDirectory()) {
                globals.del(globals.defaultOpts.outputDir);
            }
        });
        let mouseLogger = new globals.MouseLogger();
        globals.fs.lstat(globals.defaultOpts.outputDir);
        globals.fs.lstat(globals.defaultOpts.outputDir, (err, stats) => {
            expect(stats.isDirectory()).toBeTruthy();
        });
    });
    describe('handleMouseEvent(buffer)', () => {
        it('should log mouse events when active and lmb is pressed', () => {
            let mouseLogger = new globals.MouseLogger();
            mouseLogger.parent = globals.parent;
            mouseLogger.active = true;

            spyOn(mouseLogger.writeStream, 'log');

            let fakeEventBuffer = Buffer.alloc(50);

            _.forEach((1 >>> 0).toString(2), (value, index) => {
                fakeEventBuffer[index] = value;
            });

            mouseLogger.handleMouseEvent(fakeEventBuffer);

            expect(mouseLogger.writeStream.log).toHaveBeenCalled();
        });
        it('should log mouse events when active and mmb is pressed', () => {
            let mouseLogger = new globals.MouseLogger();
            mouseLogger.parent = globals.parent;
            mouseLogger.active = true;

            spyOn(mouseLogger.writeStream, 'log');

            let fakeEventBuffer = Buffer.alloc(50);

            _.forEach((4 >>> 0).toString(2), (value, index) => {
                fakeEventBuffer[index] = value;
            });

            mouseLogger.handleMouseEvent(fakeEventBuffer);

            expect(mouseLogger.writeStream.log).toHaveBeenCalled();
        });
        it('should log mouse events when active and rmb is pressed', () => {
            let mouseLogger = new globals.MouseLogger();
            mouseLogger.parent = globals.parent;
            mouseLogger.active = true;

            spyOn(mouseLogger.writeStream, 'log');

            let fakeEventBuffer = Buffer.alloc(50);

            _.forEach((2 >>> 0).toString(2), (value, index) => {
                fakeEventBuffer[index] = value;
            });

            mouseLogger.handleMouseEvent(fakeEventBuffer);

            expect(mouseLogger.writeStream.log).toHaveBeenCalled();
        });
    });
});
