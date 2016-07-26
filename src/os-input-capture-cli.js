'use strict';

import inquirer from 'inquirer';
import OsInputCapture from './os-input-capture.js';

inquirer.prompt([
  {
    type: 'rawlist',
    name: 'action',
    message: 'os-input-capture cli prompt: ',
    choices: [
        'test keyboardLogger',
        'test mouseLogger',
        'test windowLogger',
        'clean'
    ]
  }
]).then(answers => {
    if (answers.action === 'test keyboardLogger') {
        let keyboardLogger = new OsInputCapture().keyboardLogger;
    }
    if (answers.action === 'test mouseLogger') {
        let mouseLogger = new OsInputCapture().mouseLogger;
    }
    if (answers.action === 'test windowLogger') {
        let windowLogger = new OsInputCapture().windowLogger;
        windowLogger.get();
    }
    if (answers.action === 'clean') {
        console.log(JSON.stringify(answers, null, '  '));
    }
});
