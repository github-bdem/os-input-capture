'use strict';

import KeyboardLogger from '../lib/keyboard-logger.js';
import path from 'path';
import fs from 'fs';
import del from 'del';
import _ from 'lodash';

let globals = {};

describe('KeyboardLogger', () => {
    beforeEach(() => {
        globals.parent = {
            toggleActive: () => {},
            getWindow: () => {}
        };
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
        it('should call parent toggle active function when key 38 is pressed', () => {
            let keyboardLogger = new globals.KeyboardLogger();
            keyboardLogger.parent = globals.parent;
            keyboardLogger.active = false;

            spyOn(globals.parent, 'toggleActive');
            let fakeEventBuffer = Buffer.alloc(50);
            let fakeCode = 38;
            let fakeValue = 1;

            fakeEventBuffer.writeUInt16LE(fakeCode, 20);
            fakeEventBuffer.writeInt32LE(fakeValue, 44);

            keyboardLogger.handleKeyboardEvent(fakeEventBuffer);

            expect(globals.parent.toggleActive).toHaveBeenCalled();

        });
        it('should call parent toggle active function when key 37 is pressed', () => {
            let keyboardLogger = new globals.KeyboardLogger();
            keyboardLogger.parent = globals.parent;
            keyboardLogger.active = true;

            spyOn(globals.parent, 'toggleActive');
            let fakeEventBuffer = Buffer.alloc(50);
            let fakeCode = 37;
            let fakeValue = 1;

            fakeEventBuffer.writeUInt16LE(fakeCode, 20);
            fakeEventBuffer.writeInt32LE(fakeValue, 44);

            keyboardLogger.handleKeyboardEvent(fakeEventBuffer);

            expect(globals.parent.toggleActive).toHaveBeenCalled();

        });
        it('should log keyboard events when active', () => {
            let keyboardLogger = new globals.KeyboardLogger();
            keyboardLogger.parent = globals.parent;
            keyboardLogger.active = true;

            spyOn(keyboardLogger.writeStream, 'log');

            let fakeEventBuffer = Buffer.alloc(50);
            let fakeCode = 37;
            let fakeValue = 1;

            fakeEventBuffer.writeUInt16LE(fakeCode, 20);
            fakeEventBuffer.writeInt32LE(fakeValue, 44);

            keyboardLogger.handleKeyboardEvent(fakeEventBuffer);

            expect(keyboardLogger.writeStream.log).toHaveBeenCalled();
        });
        it('should call parent getWindow function when active', () => {
            let keyboardLogger = new globals.KeyboardLogger();
            keyboardLogger.parent = globals.parent;
            keyboardLogger.active = true;

            spyOn(globals.parent, 'getWindow');

            let fakeEventBuffer = Buffer.alloc(50);
            let fakeCode = 37;
            let fakeValue = 1;

            fakeEventBuffer.writeUInt16LE(fakeCode, 20);
            fakeEventBuffer.writeInt32LE(fakeValue, 44);

            keyboardLogger.handleKeyboardEvent(fakeEventBuffer);

            expect(globals.parent.getWindow).toHaveBeenCalled();
        });
    });
});
