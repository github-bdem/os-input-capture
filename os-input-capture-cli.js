'use strict';

var _inquirer = require('inquirer');

var inquirer = _interopRequireWildcard(_inquirer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

inquirer.prompt([{
    type: 'rawlist',
    name: 'action',
    message: 'run action: ',
    choices: ['run', 'clean']
}]).then(function (answers) {
    if (answers.action === 'run') {
        console.log('running');
    }
    if (answers.action === 'clean') {
        console.log(JSON.stringify(answers, null, '  '));
    }
});