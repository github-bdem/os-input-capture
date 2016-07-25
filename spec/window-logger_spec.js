'use strict';

import WindowLogger from '../window-logger.js';

let globals = {};

describe('WindowLogger', () => {
    beforeEach(() => {
        globals.windowLogger = new WindowLogger();
    });
    it('should be defined', () => {
        expect(globals.windowLogger).toBeDefined();
    });
});
