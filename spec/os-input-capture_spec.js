'use strict';

import OsInputCapture from '../lib/os-input-capture.js';

let globals = {};

describe('OsInputCapture', () => {
    beforeEach(() => {
        globals.osInputCapture = new OsInputCapture();
    });
    it('should be defined', () => {
        expect(globals.osInputCapture).toBeDefined();
    });
    it('should create instances of the logger classes', () => {
        expect(globals.osInputCapture.keyboardLogger).toBeDefined();
        expect(globals.osInputCapture.mouseLogger).toBeDefined();
        expect(globals.osInputCapture.windowLogger).toBeDefined();
    });
});
