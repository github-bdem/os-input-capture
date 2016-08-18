# OS Input Capture (oic)
This module adds operating system level keyboard, mouse, and window logging capabilities to your project.  Unlike the other loggers available for node, this logger does not require you to be typing in a specific window, it will snag all input keystrokes and mouse button events no matter what application the user currently has active.  Additionally this module allows you to take screen shots of any available window on both keyboard and mouse events.

---

##Dependencies
> Currently this module only works on linux hosts and must be launched with the ability to access `/dev/input/`, which is generally restricted to `root` or `sudo` accounts.  Additionally if you would like to be able to capture images of a specific window, you must have the `imagemagick` command line tool installed on the host machine.
###Node
```js
"devDependencies": {
    "babel-cli": "^6.11.4",
    "babel-preset-es2015": "^6.9.0",
    "del": "^2.2.1",
    "gulp": "^3.9.1",
    "gulp-babel": "^6.1.2",
    "jasmine-es6": "^0.2.1"
},
"dependencies": {
    "execa": "^0.4.0",
    "fs-extra": "^0.30.0",
    "inquirer": "^1.1.2",
    "robotjs": "^0.4.4",
    "winston": "^2.2.0"
}
```

---

##Installation
Install the package through npm
```bash
npm -i os-input-capture
```

---

## Disclaimer
I wrote this module to allow me to start crafting some input data sets for a learning machine project I am tinkering with.  That being said, I know this module could be used for some pretty nefarious stuff.  All that I ask is that you, as the user of this package, please keep in mind other peoples privacy when writing anything that uses os-input-capture, and most importantly
> ###*DO NOT USE THIS MODULE TO BE A JERK*

thanks.

---

##Example Usage
###Top level convenience class

```js
import oic from 'os-input-capture';
/*
    configuring the options for our desired loggers
    ---
    NOTE: Each logger will use its respective
    configuration values (shown below) if you do not
    explicitly provide you own during instantiation.
*/
let options = {
    keyboardOptions: {
        inputPath: '/dev/input/by-path/platform-i8042-serio-0-event-kbd',
        outputDir: path.resolve(__dirname, 'keyboard')
    },
    mouseOptions: {
        inputPath: '/dev/input/mice',
        outputDir: path.resolve(__dirname, 'mouse')
    },
    windowOptions: {
        outputDir: path.resolve(__dirname, 'window'),
        windowTitle: 'such a title'
    }
}

// picking which loggers to use
let desiredLoggers = ['keyboard', 'mouse', 'window'];

// creating our actual os logger!
let logger = oic.OsInputCapture(desiredLoggers, options);
```
###Creating standalone loggers
All loggers are available for use without the top level `OsInputCapture` class
```js
// configuration
let keyboardOptions = {
    inputPath: '/dev/input/by-path/platform-i8042-serio-0-event-kbd',
    outputDir: path.resolve(__dirname, 'keyboard')
}

// instantiation
let kbdLogger = oic.KeyboardLogger(keyboardOptions);
```
###How to start logging keys
By default logging is started when the `L` button is pressed on the keyboard, and stopped (or killed) when the `K` button is pressed.  Currently the mouse logger has to be manually activated as shown below
```js
// creating mouse logger class with default options
let mousey = oic.MouseLogger();
mousey.active = true;
```
###Getting screen shots
If you want to be able to get screen shots of windows, you currently have to use the top level `oic.OsInputCapture` class, as the `MouseLogger` and `KeyboardLogger` classes chain the call to `WindowLogger.get()` through `oic.OsInputCapture`.

```js
// main.js
let options = {
    keyboardOptions: {
        inputPath: '/dev/input/by-path/platform-i8042-serio-0-event-kbd',
        outputDir: path.resolve(__dirname, 'keyboard')
    },
    windowOptions: {
        outputDir: path.resolve(__dirname, 'window'),
        windowTitle: 'such a title'
    }
}

let desiredLoggers = ['keyboard', 'window'];

let logger = oic.OsInputCapture(desiredLoggers, options);
```
Then when `L` is pressed on the keyboard the following is executed within `keyboardLogger.handleKeyboardEvent()`

```js
// os-input-capture/keyboard-logger.js
if (!_.isUndefined(this.parent.getWindow)) {
    this.parent.getWindow();
}
```
which chains back to the following in the parent instance of `OsInputCapture`
```js
// os-input-capture/os-input-capture.js
getWindow() {
    if (!_.isUndefined(this.windowLogger)) {
        this.windowLogger.get();
    }
}
```

##Testing
Unit testing via jasmine is available via
`npm test`.

---
## License

**os-input-capture** is Copyright (c) 2016 Brandon DeMello [@bdell](https://github.com/bdell) and licenced under the MIT licence. All rights not explicitly granted in the MIT license are reserved. See the included LICENSE file for more details.
