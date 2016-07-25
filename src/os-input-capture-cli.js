'use strict';

import * as inquirer from 'inquirer';

inquirer.prompt([
  {
    type: 'rawlist',
    name: 'action',
    message: 'run action: ',
    choices: ['run', 'clean']
  }
]).then(answers => {
    if (answers.action === 'run') {
        console.log('running');
    }
    if (answers.action === 'clean') {
        console.log(JSON.stringify(answers, null, '  '));
    }
});
