'use strict';

import WindowLogger from '../lib/window-logger.js';

let globals = {};

describe('WindowLogger', () => {
    beforeEach(() => {
        globals.windowLogger = new WindowLogger();
    });
    it('should be defined', () => {
        expect(globals.windowLogger).toBeDefined();
    });
    describe('get()', () => {
        it('should throw error if window title not provided', () => {});
        it('should get a snapshot of the correct window', () => {});
    });
});
