'use strict';

import inquirer from 'inquirer';
import OsInputCapture from './os-input-capture.js';

let osInputCapture = new OsInputCapture();

inquirer.prompt([
  {
    type: 'rawlist',
    name: 'action',
    message: 'os-input-capture cli prompt: ',
    choices: ['run keylogger', 'clean']
  }
]).then(answers => {
    if (answers.action === 'run keylogger') {


    }
    if (answers.action === 'clean') {
        console.log(JSON.stringify(answers, null, '  '));
    }
});
