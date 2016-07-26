'use strict';

import inquirer from 'inquirer';
import OsInputCapture from './os-input-capture.js';

inquirer.prompt([
  {
    type: 'rawlist',
    name: 'action',
    message: 'os-input-capture cli prompt: ',
    choices: ['test keyboardLogger', 'test mouseLogger', 'clean']
  }
]).then(answers => {
    if (answers.action === 'test keyboardLogger') {
        let osInputCapture = new OsInputCapture().keyboardLogger;
    }
    if (answers.action === 'test mouseLogger') {
        let osInputCapture = new OsInputCapture().mouseLogger;
    }
    if (answers.action === 'clean') {
        console.log(JSON.stringify(answers, null, '  '));
    }
});
