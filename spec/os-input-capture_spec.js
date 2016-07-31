'use strict';

import oic from '../lib/os-input-capture.js';
import _ from 'lodash';

let globals = {};

fdescribe('oic', () => {
    beforeEach(() => {
        _.assign(globals, { oic });
    });
    it('should expose the core classes', () => {
        expect(globals.oic.OsInputCapture).toBeDefined();
        expect(globals.oic.KeyboardLogger).toBeDefined();
        expect(globals.oic.MouseLogger).toBeDefined();
        expect(globals.oic.WindowLogger).toBeDefined();
    });
    describe('OsInputCapture', () => {
        it('should not add any loggers by default', () => {
            let inputLogger = new globals.oic.OsInputCapture();
            expect(inputLogger.keyboardLogger).not.toBeDefined();
            expect(inputLogger.mouseLogger).not.toBeDefined();
            expect(inputLogger.windowLogger).not.toBeDefined();
        });
        it('should add keyboard logger if specified', () => {
            let inputLogger = new globals.oic.OsInputCapture(['keyboard']);
            expect(inputLogger.keyboardLogger).toBeDefined();
        });
        it('should add mouse logger if specified', () => {
            let inputLogger = new globals.oic.OsInputCapture(['mouse']);
            expect(inputLogger.mouseLogger).toBeDefined();
        });
        it('should add window logger if specified', () => {
            let inputLogger = new globals.oic.OsInputCapture(['window']);
            expect(inputLogger.windowLogger).toBeDefined();
        });
        describe('addKeyboardLogger', () => {
            it('should add keyboard logger to OsInputCapture', () => {});
            it('should use supplied opts if present', () => {});
            it('should use OsInputCapture opts if opts not supplied', () => {});
            it('should not create a new logger if one exists', () => {});
        });
        describe('addMouseLogger', () => {
            it('should add mouse logger to OsInputCapture', () => {});
            it('should use supplied opts if present', () => {});
            it('should use OsInputCapture opts if opts not supplied', () => {});
            it('should not create a new logger if one exists', () => {});
        });
        describe('addWindowLogger', () => {
            it('should add window logger to OsInputCapture', () => {});
            it('should use supplied opts if present', () => {});
            it('should use OsInputCapture opts if opts not supplied', () => {});
            it('should not create a new logger if one exists', () => {});
        });
        describe('toggleActive', () => {});
        describe('getWindow', () => {});
    });
});
