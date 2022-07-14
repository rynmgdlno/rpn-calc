"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.handleFlags = exports.formatOutput = exports.calc = void 0;
const commandLineFlags_1 = require("./commandLineFlags");
const constants_1 = require("./constants");
const messages_1 = require("./messages");
const operators_1 = require("./operators");
const util_1 = require("./util");
// Main calculator function. Checks validity of input, if valid
// push operand to stack or apply operator. 
const calc = (setIncludesFloat, stack, tokens) => {
    for (let i = 0; i < tokens.length; i++) {
        const val = tokens[i].trim();
        if (val.includes(".") &&
            typeof parseInt(val) === "number" &&
            !isNaN(parseInt(val))) {
            setIncludesFloat(true);
            stack.push(parseFloat(val));
        }
        else if (typeof parseInt(val) === "number" && !isNaN(parseInt(val))) {
            stack.push(parseInt(val, 10));
        }
        else if (["-", "+", "/", "*"].includes(val)) {
            if (stack.length) {
                stack.push(operators_1.operators[val](stack.pop(), stack.pop()));
            }
            else {
                (0, util_1.printError)(messages_1.errors[2]);
            }
        }
    }
};
exports.calc = calc;
// JS/TS uses a "number" type instead of int/float etc, so
// and will drop a trailing .0 even if the value is a float. The examples
// in the requirements display maintaining trailing .0, so this serves 
// just to keep the format consistent with the example:
const formatOutput = (includesFloat, stack) => {
    if (stack.length === 1 &&
        includesFloat &&
        !stack[0].toString().includes(".")) {
        console.log(`>> ${stack[0]}.0`);
    }
    else {
        console.log(`>> ${stack}`);
    }
};
exports.formatOutput = formatOutput;
// Calls the specified function based on flag input in the command line:
const handleFlags = (setIncludesFloat, input, stack) => {
    input = input.trim();
    if (input === "-c" || input === "--Clear") {
        stack.length = 0;
        setIncludesFloat(false);
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
};
exports.handleFlags = handleFlags;
// checks validity of input and returns a sanitized token
// array to be further processed:
const parse = (input) => {
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
    return input.toString().split(" ");
};
exports.parse = parse;
//# sourceMappingURL=core.js.map