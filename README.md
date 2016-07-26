# os-input-capture
A keyboard, mouse, and window capturing module for `node.js`.

##Node Dependencies
```js
{
    devDependencies: {
        babel-cli: "^6.11.4",
        babel-preset-es2015: "^6.9.0",
        del: "^2.2.1",
        gulp: "^3.9.1",
        gulp-babel: "^6.1.2",
        jasmine-es6: "^0.2.1"
    },
    dependencies: {
        execa: "^0.4.0",
        fs-extra: "^0.30.0",
        inquirer: "^1.1.2",
        lodash: "^4.14.0",
        robotjs: "^0.4.4",
        winston: "^2.2.0"
    }
}
```


##Description
This module allows a user to add os level keyboard, mouse, and window logging capabilities to their project.  An example use of this could be something like a `node.js` implementation of [iographica](http://iographica.com/).


##Installation
> Currently this module only works on linux hosts and must be launched with the ability to access `/dev/input/`, which is generally restricted to `root` (or `sudo`).  Additionally it requires the `imagemagick` command line tool.

Install the package through npm
```bash
npm -i os-input-capture
```


###Example Usage
Import/require it in your project
```js
// ES5
var osInputCapture = require('os-input-capture');

// es6
import osInputCapture from 'os-import-capture';
```


Then you can either use the entire module
```js
let opts = {
    keyboardOptions: {},
    mouseOptions: {},
    windowOptions: {}
};
let windowLogger = new OsInputCapture(opts);
```


Or just what you need:
* keyboard logging
```js
let opts = {
    keyboardOptions: {}
};
let keyboardLogger = new OsInputCapture(opts).keyboardLogger;
```

* mouse logging
```js
let mouseLogger = new OsInputCapture().mouseLogger;
```
* window capturing
```js
let windowLogger = new OsInputCapture().windowLogger;
windowLogger.get();
```


---
## License

**os-input-capture** is Copyright (c) 2016 Brandon DeMello [@bdell](https://github.com/bdell) and licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE.md file for more details.
