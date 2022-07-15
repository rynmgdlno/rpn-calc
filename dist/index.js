"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./lib/core");
const messages_1 = require("./lib/messages");
const util_1 = require("./lib/util");
// setting up stack to store operands. 
// Outside of app() scope to maintain values on successive calls to app()
let stack = [];
// main process:
const app = (input) => {
    try {
        (0, core_1.handleFlags)(input, stack);
        (0, core_1.evaluate)(stack, (0, core_1.parse)(input));
        (0, core_1.formatOutput)(stack);
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            return;
        }
        ;
    }
};
// command line functionality driver:
process.stdin.resume(); // starts reading stdin
(0, util_1.printMessage)(messages_1.flagMessages[1]); // prints help message on start
process.stdin.on("data", data => {
    app(data.toString());
});
//# sourceMappingURL=index.js.map