'use strict';

import MouseLogger from '../lib/mouse-logger.js';

let globals = {};

describe('KeyboardLogger', () => {
    beforeEach(() => {
        globals.mouseLogger = new MouseLogger();
    });
    it('should be defined', () => {
        expect(globals.mouseLogger).toBeDefined();
    });
    it('should initialize the opts values with defaults if not present', () => {});
    it('should create the mouse log output dir on write if not present', () => {});
    it('should create the read stream', () => {});
    it('should create the write stream', () => {});
    describe('handleMouseEvent(buffer)', () => {
        it('should toggle active when lmb and rmb are pressed', () => {});
        it('should log mouse events when active', () => {});
    });
});
