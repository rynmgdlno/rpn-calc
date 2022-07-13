"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flagFuncs = void 0;
const util_1 = require("./util");
exports.flagFuncs = {
    // clears/resets the current expression stack
    clear: function (message) {
        (0, util_1.printMessage)(message);
        return [];
    },
    // prints help guide
    help: function (message) {
        (0, util_1.printMessage)(message);
    },
    // prints current expression stack
    list: function (message) {
        (0, util_1.printMessage)(message);
    },
    // force exits program
    quit: function (message) {
        (0, util_1.printMessage)(message);
        process.exit(0);
    }
};
//# sourceMappingURL=commandLineFlags.js.map