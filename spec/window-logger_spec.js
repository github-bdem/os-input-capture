'use strict';

import WindowLogger from '../lib/window-logger.js';
import path from 'path';
import fs from 'fs';
import del from 'del';
import _ from 'lodash';
import execa from 'execa';

let globals = {};

describe('WindowLogger', () => {
    beforeEach(() => {
        globals.defaultOpts = {
            outputDir: path.resolve(__dirname, '../lib', 'window'),
            colorMode: '-monochrome'

        };
        globals.testOpts = {
            outputDir: path.resolve(__dirname, '../lib', 'window'),
            windowTitle: 'test window title'
        };
        _.assign(globals, { WindowLogger, fs, path, del, execa });
    });
    it('should be defined', () => {
        let windowLogger = new globals.WindowLogger();
        expect(windowLogger).toBeDefined();
    });
    it('should initialize the opts values with defaults if not present', () => {
        let windowLogger = new globals.WindowLogger();
        expect(windowLogger.opts).toEqual(globals.defaultOpts);
    });
    it('should create the window output dir on write if not present', () => {
        globals.fs.lstat(globals.defaultOpts.outputDir, (err, stats) => {
            if (!err && stats.isDirectory()) {
                globals.del(globals.defaultOpts.outputDir);
            }
        });
        let windowLogger = new globals.WindowLogger();
        globals.fs.lstat(globals.defaultOpts.outputDir);
        globals.fs.lstat(globals.defaultOpts.outputDir, (err, stats) => {
            expect(stats.isDirectory()).toBeTruthy();
        });
    });
    describe('get()', () => {
        it('should get a snapshot of the correct window', () => {
            let windowLogger = new globals.WindowLogger();
            windowLogger.active = true;
            windowLogger.opts.windowTitle = globals.testOpts.windowTitle;
            spyOn(globals.execa, 'shell');
            windowLogger.get();
            expect(globals.execa.shell).toHaveBeenCalled();
        });
    });
});
