'use strict';

import MouseLogger from '../mouse-logger.js';

let globals = {};

describe('KeyboardLogger', () => {
    beforeEach(() => {
        globals.mouseLogger = new MouseLogger();
    });
    it('should be defined', () => {
        expect(globals.mouseLogger).toBeDefined();
    });
});
