'use strict';

import KeyboardLogger from '../lib/keyboard-logger.js';
import path from 'path';

let globals = {};

describe('KeyboardLogger', () => {
    beforeEach(() => {
        globals.defaultOpts = {
            kbdPath: '/dev/input/by-path/platform-i8042-serio-0-event-kbd',
            keyboardOutputDir: path.resolve(__dirname, 'keyboard')
        };
        globals.keyboardLogger = new KeyboardLogger();
    });
    it('should be defined', () => {
        expect(globals.keyboardLogger).toBeDefined();
    });
    it('should initialize the opts values with defaults if not present', () => {});
    it('should create the keyboard log output dir on write if not present', () => {});
    it('should create the read stream', () => {});
    it('should create the write stream', () => {});
    describe('handleKeyboardEvent(buffer)', () => {
        it('should activate the logger when l is pressed', () => {});
        it('should kill the logger when k is pressed', () => {});
        it('should log keyboard events when active', () => {});
    });
});
