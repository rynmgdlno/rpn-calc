"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./lib/core");
const messages_1 = require("./lib/messages");
const util_1 = require("./lib/util");
// tracking if a value is a float for output formatting purposes
let includesFloat = false;
// storing all operands in stack
let stack = [];
// setter for float bool:
const setIncludesFloat = (isFloat) => {
    const newFloat = isFloat;
    includesFloat = newFloat;
};
// main process:
const app = (input) => {
    try {
        const tokens = (0, core_1.parse)(input);
        input.toString().split(" ");
        (0, core_1.handleFlags)(setIncludesFloat, input, stack);
        (0, core_1.calc)(setIncludesFloat, stack, tokens);
        (0, core_1.formatOutput)(includesFloat, stack);
    }
    catch (err) {
        if (err instanceof Error)
            return;
    }
};
// command line functionality driver:
process.stdin.resume();
(0, util_1.printMessage)(messages_1.flagMessages[1]);
process.stdin.on("data", data => {
    app(data.toString());
});
//# sourceMappingURL=index.js.map