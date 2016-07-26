'use strict';

import MouseLogger from '../lib/mouse-logger.js';
import path from 'path';
import fs from 'fs';
import del from 'del';
import _ from 'lodash';

let globals = {};

describe('MouseLogger', () => {
    beforeEach(() => {
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
        it('should toggle active when lmb and rmb are pressed', () => {});
        it('should log mouse events when active', () => {});
    });
});
