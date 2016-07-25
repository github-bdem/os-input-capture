'use strict';

import KeyboardLogger from '../keyboard-logger.js';

let globals = {};

describe('KeyboardLogger', () => {
    beforeEach(() => {
        globals.keyboardLogger = new KeyboardLogger();
    });
    it('should be defined', () => {
        expect(globals.keyboardLogger).toBeDefined();
    });
});
