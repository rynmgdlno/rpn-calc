"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flagFuncs = void 0;
const messages_1 = require("./messages");
const util_1 = require("./util");
// Command line flag functions:
exports.flagFuncs = {
    // clears/resets the current expression stack
    clear: function (stack) {
        stack.length = 0;
        (0, util_1.printMessage)(messages_1.flagMessages[0]);
    },
    // prints help guide
    help: function () {
        (0, util_1.printMessage)(messages_1.flagMessages[1]);
    },
    // prints current expression stack
    list: function (stack) {
        (0, util_1.printMessage)(stack);
    },
    // force exits program
    quit: function () {
        (0, util_1.printMessage)(messages_1.flagMessages[2]);
        process.exit(0);
    }
};
//# sourceMappingURL=commandLineFlags.js.map