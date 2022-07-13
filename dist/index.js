"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.operators = void 0;
const commandLineFlags_1 = require("./lib/commandLineFlags");
const constants_1 = require("./lib/constants");
const messages_1 = require("./lib/messages");
const util_1 = require("./lib/util");
exports.operators = {
    "+": (a, b) => b + a,
    "-": (a, b) => b - a,
    "*": (a, b) => b * a,
    "/": (a, b) => b / a
};
let stack = [];
let includesFloat = false;
const parse = (input) => {
    let tokens = input.toString().split(" ");
    input = input.trim();
    // non expression input handling:
    // verifying non empty input:
    if (input.length === 0) {
        (0, util_1.printError)(messages_1.errors[0]);
        return;
    }
    // verifying supported input:
    if (isNaN(parseInt(input)) &&
        !constants_1.supportedOperators.includes(input) &&
        !constants_1.supportedFlags.includes(input)) {
        (0, util_1.printError)(messages_1.errors[1]);
        return;
    }
    // handling command line flags:
    if (input === "-c" || input === "--Clear") {
        stack = commandLineFlags_1.flagFuncs.clear(messages_1.flagMessages[0]);
        includesFloat = false;
        return;
    }
    if (input === "-h" || input === "--Help") {
        commandLineFlags_1.flagFuncs.help(messages_1.flagMessages[1]);
        return;
    }
    if (input === "-l" || input === "--List") {
        commandLineFlags_1.flagFuncs.list(stack);
        return;
    }
    if (input === "-q" || input === "--Quit") {
        commandLineFlags_1.flagFuncs.quit(messages_1.flagMessages[2]);
        return;
    }
    for (let i = 0; i < tokens.length; i++) {
        const val = tokens[i].trim();
        if (val.includes(".") &&
            typeof parseInt(val) === "number" &&
            !isNaN(parseInt(val))) {
            includesFloat = true;
            stack.push(parseFloat(val));
        }
        else if (typeof parseInt(val) === "number" && !isNaN(parseInt(val))) {
            stack.push(parseInt(val, 10));
        }
        else if (["-", "+", "/", "*"].includes(val)) {
            if (stack.length) {
                stack.push(exports.operators[val](stack.pop(), stack.pop()));
            }
            else {
                (0, util_1.printError)(messages_1.errors[2]);
            }
        }
    }
    // formatting output to maintain float
    // decimal syntax per requirement example:
    if (stack.length === 1 &&
        includesFloat &&
        !stack[0].toString().includes(".")) {
        console.log(`>> ${stack[0]}.0`);
    }
    else {
        console.log(`>> ${stack}`);
    }
};
exports.parse = parse;
// command line functionality driver:
process.stdin.resume();
(0, util_1.printMessage)(messages_1.flagMessages[1]);
process.stdin.on("data", data => {
    (0, exports.parse)(data.toString());
});
//# sourceMappingURL=index.js.map