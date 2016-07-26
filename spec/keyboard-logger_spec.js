'use strict';

import KeyboardLogger from '../lib/keyboard-logger.js';
import path from 'path';
import fs from 'fs';
import del from 'del';
import _ from 'lodash';

let globals = {};

describe('KeyboardLogger', () => {
    beforeEach(() => {
        globals.defaultOpts = {
            inputPath: '/dev/input/by-path/platform-i8042-serio-0-event-kbd',
            outputDir: path.resolve(__dirname, '../lib/', 'keyboard')
        };
        _.assign(globals, { KeyboardLogger, fs, path, del });
    });
    it('should be defined', () => {
        let keyboardLogger = new globals.KeyboardLogger();
        expect(keyboardLogger).toBeDefined();
    });
    it('should initialize the opts values with defaults if not present', () => {
        let keyboardLogger = new globals.KeyboardLogger();
        expect(keyboardLogger.opts).toEqual(globals.defaultOpts);
    });
    it('should create the keyboard log output dir on write if not present', () => {
        globals.fs.lstat(globals.defaultOpts.outputDir, (err, stats) => {
            if (!err && stats.isDirectory()) {
                globals.del(globals.defaultOpts.outputDir);
            }
        });
        let keyboardLogger = new globals.KeyboardLogger();
        globals.fs.lstat(globals.defaultOpts.outputDir);
        globals.fs.lstat(globals.defaultOpts.outputDir, (err, stats) => {
            expect(stats.isDirectory()).toBeTruthy();
        });
    });
    describe('handleKeyboardEvent(buffer)', () => {
        it('should activate the logger when l is pressed', () => {});
        it('should kill the logger when k is pressed', () => {});
        it('should log keyboard events when active', () => {});
    });
});
