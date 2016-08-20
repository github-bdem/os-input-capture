'use strict';

import oic from '../lib/os-input-capture.js';
import _ from 'lodash';

let globals = {};

describe('oic', () => {
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
            it('should add keyboard logger to OsInputCapture', () => {
                let inputLogger = new globals.oic.OsInputCapture();
                inputLogger.addKeyboardLogger({});
                expect(inputLogger.keyboardLogger).toBeDefined();
            });
            it('should use supplied opts if present', () => {
                let fakeOpts = {
                    keyboardOptions: {
                        inputPath: 'fakeInputPath',
                        outputDir: 'fakeOutputPath'
                    }
                };
                let inputLogger = new globals.oic.OsInputCapture();
                inputLogger.addKeyboardLogger(fakeOpts);
                expect(inputLogger.keyboardLogger.opts).toEqual(fakeOpts.keyboardOptions);
            });
        });
        describe('addMouseLogger', () => {
            it('should add mouse logger to OsInputCapture', () => {
                let inputLogger = new globals.oic.OsInputCapture();
                inputLogger.addMouseLogger({});
                expect(inputLogger.mouseLogger).toBeDefined();
            });
            it('should use supplied opts if present', () => {
                let fakeOpts = {
                    mouseOptions: {
                        inputPath: 'fakeInputPath',
                        outputDir: 'fakeOutputPath'
                    }
                };
                let inputLogger = new globals.oic.OsInputCapture();
                inputLogger.addMouseLogger(fakeOpts);
                expect(inputLogger.mouseLogger.opts).toEqual(fakeOpts.mouseOptions);
            });
        });
        describe('addWindowLogger', () => {
            it('should add window logger to OsInputCapture', () => {
                let inputLogger = new globals.oic.OsInputCapture();
                inputLogger.addWindowLogger({});
                expect(inputLogger.windowLogger).toBeDefined();
            });
            it('should use supplied opts if present', () => {
                let fakeOpts = {
                    windowOptions: {
                        outputDir: 'fakeOutputPath',
                        colorMode: '-fakeMode'
                    }
                };
                let inputLogger = new globals.oic.OsInputCapture();
                inputLogger.addWindowLogger(fakeOpts);
                expect(inputLogger.windowLogger.opts).toEqual(fakeOpts.windowOptions);
            });
        });
        describe('toggleActive', () => {
            it('should toggle its own active state', () => {
                let inputLogger = new globals.oic.OsInputCapture();
                let originalState = inputLogger.active;
                inputLogger.toggleActive();
                expect(inputLogger.active).toEqual(!originalState);
            });
            it('should toggle its keyboardLogger active state if its defined', () => {
                let fakeOpts = {
                    keyboardOptions: {
                        inputPath: 'fakeInputPath',
                        outputDir: 'fakeOutputPath'
                    }
                };
                let inputLogger = new globals.oic.OsInputCapture(['keyboard'], fakeOpts);
                let originalState = inputLogger.keyboardLogger.active;
                inputLogger.toggleActive();
                expect(inputLogger.keyboardLogger.active).toEqual(!originalState);
            });
            it('should toggle its mouseLogger active state if its defined', () => {
                let fakeOpts = {
                    mouseOptions: {
                        inputPath: 'fakeInputPath',
                        outputDir: 'fakeOutputPath'
                    }
                };
                let inputLogger = new globals.oic.OsInputCapture(['mouse'], fakeOpts);
                let originalState = inputLogger.mouseLogger.active;
                inputLogger.toggleActive();
                expect(inputLogger.mouseLogger.active).toEqual(!originalState);
            });
            it('should toggle its keyboardLogger active state if its defined', () => {
                let fakeOpts = {
                    windowOptions: {
                        outputDir: 'fakeOutputPath'
                    }
                };
                let inputLogger = new globals.oic.OsInputCapture(['window'], fakeOpts);
                let originalState = inputLogger.windowLogger.active;
                inputLogger.toggleActive();
                expect(inputLogger.windowLogger.active).toEqual(!originalState);
            });
        });
        describe('getWindow', () => {
            it('should call windowLogger.get if this.windowLogger is defined', () => {
                let fakeOpts = {
                    windowOptions: {
                        outputDir: 'fakeOutputPath'
                    }
                };
                let inputLogger = new globals.oic.OsInputCapture(['window'], fakeOpts);
                spyOn(inputLogger.windowLogger, 'get');
                inputLogger.getWindow();
                expect(inputLogger.windowLogger.get).toHaveBeenCalled();
            });
        });
    });
});
